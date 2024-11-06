import { ActionReducerMap } from '@ngrx/store';
import * as fromIndividuals from './individuals-store/individual.reducer';
import * as fromLegalEntities from './legal-entities-store/legal-entity.reducer';
import * as fromBeneficiriesSettings from './beneficiaries-settings-store/beneficiary-settings.reducer';

export interface AppState {
  beneficiariesSettings: fromBeneficiriesSettings.BeneficiariesSettingsState;
  individuals: fromIndividuals.IndividualState;
  legalEntities: fromLegalEntities.LegalEntryState;
}

export const appReducer: ActionReducerMap<AppState> = {
  beneficiariesSettings: fromBeneficiriesSettings.beneficiariesSettingsReducer,
  individuals: fromIndividuals.individualReducer,
  legalEntities: fromLegalEntities.legalEntitiesReducer,
};
