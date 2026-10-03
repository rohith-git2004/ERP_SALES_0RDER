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

  private orders: SalesOrder[] = [
    this.seed(
      'SO-1005',
      'VR-10005',
      '30-09-2026',
      'ROHIT CUSTOMER',
      3000,
      'Approved'
    ),

    this.seed(
      'SO-1004',
      'VR-10004',
      '30-09-2026',
      'TEST CUSTOMER ROHIT',
      50,
      'Pending'
    ),

    this.seed(
      'SO-1003',
      'VR-10003',
      '30-09-2026',
      'TEST CUSTOMER ROHIT',
      2000,
      'Approved'
    ),

    this.seed(
      'SO-1002',
      'VR-10002',
      '30-09-2026',
      'TEST CUSTOMER ROHIT',
      1150,
      'Pending'
    ),

    this.seed(
      'SO-1001',
      'VR-10001',
      '30-09-2026',
      'TEST CUSTOMER ROHIT',
      575,
      'Approved'
    )
  ];

  private current: SalesOrder | null = null;
  private editingId: string | null = null;
  private sequence = 10006;

  private seed(
    id: string,
    voucherNumber: string,
    date: string,
    customer: string,
    amount: number,
    status: OrderStatus
  ): SalesOrder {

    const items: OrderItem[] = [
      {
        name: 'PVC Trunking 16 x 16',
        code: 'PVC1616',
        size: '16 × 16 mm',
        available: 148,
        spRate: 4,
        qty: 1,
        orderRate: 4
      }
    ];

    return {
      id,
      voucherNumber,
      voucherType: 'Voucher Receipt',
      routePlan: 'Dubai',
      date,
      customer,

      balance: 3250,
      overdue: 750,
      lastPayment: '12 Sep',

      deliveryDate: '',
      notes: '',

      status,
      authorized: status === 'Approved',
      isDraft: status === 'Pending',

      items
    };
  }

  getOrders(): SalesOrder[] {
    return this.orders.map(order => this.clone(order));
  }

  getDrafts(): SalesOrder[] {
    return this.orders
      .filter(order => order.isDraft === true)
      .map(order => this.clone(order));
  }

  beginNew(): void {
    this.editingId = null;
    this.current = null;
  }

  beginEdit(id: string): SalesOrder | null {
    const order = this.orders.find(
      item => item.id === id
    );

    if (!order) {
      return null;
    }

    this.editingId = id;
    this.current = this.clone(order);

    return this.clone(order);
  }

  setCurrent(order: SalesOrder): void {
    this.current = this.clone(order);
    this.editingId = order.id || null;
  }

  getCurrent(): SalesOrder | null {
    return this.current
      ? this.clone(this.current)
      : null;
  }

  saveDraft(order: SalesOrder): SalesOrder {
    const prepared = this.prepareOrder(
      order,
      true
    );

    const index = this.orders.findIndex(
      item => item.id === prepared.id
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

    return this.clone(prepared);
  }

  commit(order: SalesOrder): SalesOrder {
    const prepared = this.prepareOrder(
      order,
      false
    );

    const index = this.orders.findIndex(
      item => item.id === prepared.id
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

    return this.clone(prepared);
  }

  updateStatus(
    id: string,
    authorized: boolean
  ): void {

    const index = this.orders.findIndex(
      order => order.id === id
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
      draft && !prepared.authorized;

    return prepared;
  }

  createOrderId(): string {
    return `SO-${this.sequence}`;
  }

  createVoucherNumber(): string {
    return `VR-${this.sequence++}`;
  }

  clone(order: SalesOrder): SalesOrder {
    return {
      ...order,

      items: order.items.map(item => ({
        ...item
      }))
    };
  }
}