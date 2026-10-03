import { Routes } from '@angular/router';
import { SalesOrderLandingComponent } from './sales-order/sales-order-landing.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { WorkingComponent } from './working/working.component';
import { ReviewOrderComponent } from './review-order/review-order.component';
import { SavedDraftComponent } from './saved-draft/saved-draft.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sales-order' },
  { path: 'sales-order', component: SalesOrderLandingComponent },
  { path: 'new-order', component: NewOrderComponent },
  { path: 'working', component: WorkingComponent },
  { path: 'review-order', component: ReviewOrderComponent },
  { path: 'saved-draft', component: SavedDraftComponent },
  { path: '**', redirectTo: 'sales-order' }
];
