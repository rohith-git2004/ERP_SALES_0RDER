import { Injectable } from '@angular/core';

export type OrderStatus = 'Pending' | 'Approved';

export interface OrderItem {
  name: string;
  code: string;
  size: string;
  available: number;
  spRate: number;
  qty: number;
  orderRate: number;
}

export interface SalesOrder {
  id: string;
  voucherNumber: string;
  voucherType: string;
  routePlan: string;
  date: string;
  customer: string;

  balance: number;
  overdue: number;
  lastPayment: string;

  deliveryDate: string;
  notes: string;

  status: OrderStatus;
  authorized: boolean;
  isDraft: boolean;

  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  private orders: SalesOrder[] = [];

  private readonly STORAGE_KEY =
    'erp_sales_orders';

  private current: SalesOrder | null = null;

  private editingId: string | null = null;

  private sequence = 10001;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const saved =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (!saved) {
      this.orders = [];
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        this.orders = [];
        return;
      }

      this.orders = parsed.map(
        (order: SalesOrder) =>
          this.clone(order)
      );

      this.updateSequence();

    } catch {
      this.orders = [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.orders)
    );
  }

  private updateSequence(): void {
    let highest = 10000;

    this.orders.forEach(order => {
      const orderMatch =
        order.id &&
        order.id.match(/^SO-(\d+)$/);

      if (orderMatch) {
        const number =
          Number(orderMatch[1]);

        if (
          Number.isFinite(number) &&
          number > highest
        ) {
          highest = number;
        }
      }

      const voucherMatch =
        order.voucherNumber &&
        order.voucherNumber.match(/^VR-(\d+)$/);

      if (voucherMatch) {
        const number =
          Number(voucherMatch[1]);

        if (
          Number.isFinite(number) &&
          number > highest
        ) {
          highest = number;
        }
      }
    });

    this.sequence = highest + 1;
  }

  getOrders(): SalesOrder[] {
    return this.orders.map(
      order => this.clone(order)
    );
  }

  getDrafts(): SalesOrder[] {
    return this.orders
      .filter(
        order =>
          order.isDraft === true
      )
      .map(
        order => this.clone(order)
      );
  }

  beginNew(): void {
    this.editingId = null;
    this.current = null;
  }

  beginEdit(
    id: string
  ): SalesOrder | null {

    const order =
      this.orders.find(
        item => item.id === id
      );

    if (!order) {
      return null;
    }

    this.editingId = id;

    this.current =
      this.clone(order);

    return this.clone(order);
  }

  setCurrent(
    order: SalesOrder
  ): void {

    this.current =
      this.clone(order);

    this.editingId =
      order.id || null;
  }

  getCurrent(): SalesOrder | null {
    return this.current
      ? this.clone(this.current)
      : null;
  }

  saveDraft(
    order: SalesOrder
  ): SalesOrder {

    const prepared =
      this.prepareOrder(
        order,
        true
      );

    const index =
      this.orders.findIndex(
        item =>
          item.id === prepared.id
      );

    if (index >= 0) {
      this.orders[index] =
        this.clone(prepared);
    } else {
      this.orders.unshift(
        this.clone(prepared)
      );
    }

    this.current =
      this.clone(prepared);

    this.editingId =
      prepared.id;

    this.saveToStorage();

    return this.clone(prepared);
  }

  commit(
    order: SalesOrder
  ): SalesOrder {

    const prepared =
      this.prepareOrder(
        order,
        false
      );

    const index =
      this.orders.findIndex(
        item =>
          item.id === prepared.id
      );

    if (index >= 0) {
      this.orders[index] =
        this.clone(prepared);
    } else {
      this.orders.unshift(
        this.clone(prepared)
      );
    }

    this.current =
      this.clone(prepared);

    this.editingId =
      prepared.id;

    this.saveToStorage();

    return this.clone(prepared);
  }

  updateStatus(
    id: string,
    authorized: boolean
  ): void {

    const index =
      this.orders.findIndex(
        order =>
          order.id === id
      );

    if (index < 0) {
      return;
    }

    this.orders[index].authorized =
      authorized;

    this.orders[index].status =
      authorized
        ? 'Approved'
        : 'Pending';

    this.orders[index].isDraft =
      !authorized;

    if (
      this.current &&
      this.current.id === id
    ) {
      this.current.authorized =
        authorized;

      this.current.status =
        authorized
          ? 'Approved'
          : 'Pending';

      this.current.isDraft =
        !authorized;
    }

    this.saveToStorage();
  }

  deleteOrder(
    id: string
  ): boolean {

    const index =
      this.orders.findIndex(
        order =>
          order.id === id
      );

    if (index < 0) {
      return false;
    }

    this.orders.splice(
      index,
      1
    );

    if (
      this.current &&
      this.current.id === id
    ) {
      this.current = null;
      this.editingId = null;
    }

    this.saveToStorage();

    return true;
  }

  private prepareOrder(
    order: SalesOrder,
    draft: boolean
  ): SalesOrder {

    const prepared =
      this.clone(order);

    if (!prepared.id) {
      prepared.id =
        this.createOrderId();
    }

    if (!prepared.voucherNumber) {
      prepared.voucherNumber =
        this.createVoucherNumber();
    }

    if (!prepared.voucherType) {
      prepared.voucherType =
        'Voucher Receipt';
    }

    prepared.status =
      prepared.authorized
        ? 'Approved'
        : 'Pending';

    prepared.isDraft =
      draft &&
      !prepared.authorized;

    return prepared;
  }

  createOrderId(): string {
    return `SO-${this.sequence}`;
  }

  createVoucherNumber(): string {
    return `VR-${this.sequence++}`;
  }

  clone(
    order: SalesOrder
  ): SalesOrder {

    return {
      ...order,
      items: order.items.map(
        item => ({
          ...item
        })
      )
    };
  }
}