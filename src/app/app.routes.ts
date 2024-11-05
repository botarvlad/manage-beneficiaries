import { Routes } from '@angular/router';
import { ManageBeneficiariesComponent } from './components/manage-beneficiaries/manage-beneficiaries.component';
import { BeneficiaryEditComponent } from './components/manage-beneficiaries/beneficiary-edit/beneficiary-edit.component';
import { BeneficiaryDetailComponent } from './components/manage-beneficiaries/beneficiary-detail/beneficiary-detail.component';
import { unsavedChangesGuard } from './shared/guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/beneficiaries', pathMatch: 'full' },
  {
    path: 'beneficiaries',
    component: ManageBeneficiariesComponent,
  },
  {
    path: 'beneficiaries/new',
    component: BeneficiaryEditComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'beneficiaries/:id',
    component: BeneficiaryDetailComponent,
  },
  {
    path: 'beneficiaries/:id/edit',
    component: BeneficiaryEditComponent,
    canDeactivate: [unsavedChangesGuard],
  },
];
