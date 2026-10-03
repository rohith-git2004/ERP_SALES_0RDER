import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderStoreService, SalesOrder } from '../order-store.service';

@Component({
  selector: 'app-sales-order-landing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sales-order-landing.component.html',
  styleUrl: './sales-order-landing.component.css'
})
export class SalesOrderLandingComponent {
  showList = false;
  search = '';
  page = 1;
  pageSize = 5;

  constructor(private router: Router, private store: OrderStoreService) {}

  newOrder(): void { this.store.beginNew(); this.router.navigate(['/new-order']); }
  working(): void { this.router.navigate(['/working']); }
  openList(): void { this.search = ''; this.page = 1; this.showList = true; }
  closeList(): void { this.showList = false; }

  get filteredOrders(): SalesOrder[] {
    const value = this.search.trim().toLowerCase();
    const orders = this.store.getOrders();
    if (!value) return orders;
    return orders.filter(order =>
      order.voucherNumber.toLowerCase().includes(value) ||
      order.customer.toLowerCase().includes(value) ||
      order.status.toLowerCase().includes(value) ||
      order.voucherType.toLowerCase().includes(value)
    );
  }

  get pagedOrders(): SalesOrder[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
  }

  get pageCount(): number { return Math.max(1, Math.ceil(this.filteredOrders.length / this.pageSize)); }

  editOrder(order: SalesOrder): void {
    this.store.beginEdit(order.id);
    this.showList = false;
    this.router.navigate(['/new-order']);
  }

  firstPage(): void { this.page = 1; }
  previousPage(): void { this.page = Math.max(1, this.page - 1); }
  nextPage(): void { this.page = Math.min(this.pageCount, this.page + 1); }
  lastPage(): void { this.page = this.pageCount; }
  amountForItems = (sum: number, item: { qty: number; orderRate: number }): number => sum + item.qty * item.orderRate;
}
