import { createAction, props } from '@ngrx/store';
import { BENEFICIARY_TYPES } from '../../shared/constants';

export type BeneficiaryType =
  (typeof BENEFICIARY_TYPES)[keyof typeof BENEFICIARY_TYPES];

export const setSelectedBeneficiaryType = createAction(
  '[BENEFICIARY_SETTINGS] Set Selected Beneficiary Type',
  props<{ selectedType: BeneficiaryType }>()
);
