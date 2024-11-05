import { ActionReducerMap } from '@ngrx/store';
import * as fromIndividuals from './individuals-store/individual.reducer';
import * as fromLegalEntities from './legal-entities-store/legal-entity.reducer';

export interface AppState {
  individuals: fromIndividuals.IndividualState;
  legalEntities: fromLegalEntities.LegalEntryState;
}

export const appReducer: ActionReducerMap<AppState> = {
  individuals: fromIndividuals.individualReducer,
  legalEntities: fromLegalEntities.legalEntitiesReducer,
};
