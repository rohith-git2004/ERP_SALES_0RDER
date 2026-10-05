import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  OrderStoreService,
  SalesOrder
} from '../order-store.service';

@Component({
  selector: 'app-saved-draft',
  standalone: true,
  templateUrl: './saved-draft.component.html',
  styleUrl: './saved-draft.component.css'
})
export class SavedDraftComponent implements OnInit {

  drafts: SalesOrder[] = [];

  showDeleteModal = false;

  draftToDelete: SalesOrder | null = null;

  constructor(
    private router: Router,
    private store: OrderStoreService
  ) {}

  ngOnInit(): void {
    this.loadDrafts();
  }

  private loadDrafts(): void {
    this.drafts = this.store.getDrafts();
  }

  getTotal(order: SalesOrder): number {
    return order.items.reduce(
      (sum, item) =>
        sum + (item.qty * item.orderRate),
      0
    );
  }

  edit(order: SalesOrder): void {
    const selected =
      this.store.beginEdit(order.id);

    if (selected) {
      this.router.navigate(['/new-order']);
    }
  }

  deleteDraft(order: SalesOrder): void {
    this.draftToDelete = order;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.draftToDelete = null;
  }

  confirmDeleteDraft(): void {
    if (!this.draftToDelete) {
      return;
    }

    const deleted =
      this.store.deleteOrder(
        this.draftToDelete.id
      );

    if (deleted) {
      this.loadDrafts();
    }

    this.closeDeleteModal();
  }

  createNew(): void {
    this.store.beginNew();
    this.router.navigate(['/new-order']);
  }

  back(): void {
    this.store.beginNew();
    this.router.navigate(['/new-order']);
  }
}