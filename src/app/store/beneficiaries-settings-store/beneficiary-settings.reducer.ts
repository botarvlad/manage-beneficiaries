import { createReducer, on } from '@ngrx/store';
import {
  BeneficiaryType,
  setSelectedBeneficiaryType,
} from './beneficiary-settings.actions';
import { BENEFICIARY_TYPES } from '../../shared/constants';

export interface BeneficiariesSettingsState {
  selectedBeneficiaryType: BeneficiaryType;
}

const initialState: BeneficiariesSettingsState = {
  selectedBeneficiaryType: BENEFICIARY_TYPES.INDIVIDUAL,
};

export const beneficiariesSettingsReducer = createReducer(
  initialState,
  on(setSelectedBeneficiaryType, (state, { selectedType }) => ({
    ...state,
    selectedBeneficiaryType: selectedType,
  }))
);
