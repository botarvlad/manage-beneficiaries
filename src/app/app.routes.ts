import { Routes } from '@angular/router';
import { ManageBeneficiariesComponent } from './components/manage-beneficiaries/manage-beneficiaries.component';
import { BeneficiaryEditComponent } from './components/manage-beneficiaries/beneficiary-edit/beneficiary-edit.component';
import { unsavedChangesGuard } from './shared/guards/unsaved-changes.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/beneficiaries', pathMatch: 'full' },
  {
    path: 'beneficiaries',
    component: ManageBeneficiariesComponent,
  },
  {
    path: 'beneficiaries/new',
    loadComponent: () =>
      import(
        './components/manage-beneficiaries/beneficiary-edit/beneficiary-edit.component'
      ).then((m) => m.BeneficiaryEditComponent),
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'beneficiaries/:id/edit',
    component: BeneficiaryEditComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
