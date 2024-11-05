import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { LegalEntryState } from './legal-entity.reducer';

export const selectLegalEntityState = (state: AppState) => state.legalEntities;

export const selectAllLegalEntities = createSelector(
  selectLegalEntityState,
  (state: LegalEntryState) => state.legalEntities
);

export const selectLegalEntitiesLoading = createSelector(
  selectLegalEntityState,
  (state: LegalEntryState) => state.loading
);
