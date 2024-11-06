import { CanDeactivateFn } from '@angular/router';
import { BeneficiaryEditComponent } from '../../components/manage-beneficiaries/beneficiary-edit/beneficiary-edit.component';

export const unsavedChangesGuard: CanDeactivateFn<BeneficiaryEditComponent> = (
  component
) => {
  if (component.beneficiaryForm.dirty) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};
