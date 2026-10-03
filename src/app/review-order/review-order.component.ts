import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  OrderStoreService,
  SalesOrder
} from '../order-store.service';

@Component({
  selector: 'app-review-order',
  standalone: true,
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css'
})
export class ReviewOrderComponent implements OnInit {

  order: SalesOrder | null = null;
  saved = false;

  constructor(
    private router: Router,
    private store: OrderStoreService
  ) {}

  ngOnInit(): void {
    this.order = this.store.getCurrent();

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 0);
  }

  get subtotal(): number {
    if (!this.order) {
      return 0;
    }

    return this.order.items.reduce(
      (sum, item) =>
        sum + (item.qty * item.orderRate),
      0
    );
  }

  get vat(): number {
    return this.subtotal * 0.05;
  }

  get totalAmount(): number {
    return this.subtotal + this.vat;
  }

  getItemAmount(
    qty: number,
    orderRate: number
  ): number {
    return qty * orderRate;
  }

  getStatus(): string {
    if (!this.order) {
      return 'Pending';
    }

    return this.order.authorized
      ? 'Approved'
      : 'Pending';
  }

  save(): void {
    if (!this.order) {
      return;
    }

    this.order = this.store.commit(this.order);

    this.router.navigate(['/new-order']);
  }

  back(): void {
    this.router.navigate(['/new-order']);
  }

  openPrint(): void {
    if (!this.order) {
      return;
    }

    const orderData = encodeURIComponent(
      JSON.stringify(this.order)
    );

    window.open(
      `http://localhost:4201/?order=${orderData}`,
      '_blank'
    );
  }

  openReport(): void {
    if (!this.order) {
      return;
    }

    const orderData = encodeURIComponent(
      JSON.stringify(this.order)
    );

    window.open(
      `http://localhost:4202/?order=${orderData}`,
      '_blank'
    );
  }
}