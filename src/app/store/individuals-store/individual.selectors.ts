import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IndividualState } from './individual.reducer';

export const selectIndividualState = (state: AppState) => state.individuals;

export const selectAllIndividuals = createSelector(
  selectIndividualState,
  (state: IndividualState) => state.individuals
);

export const selectIndividualsLoading = createSelector(
  selectIndividualState,
  (state: IndividualState) => state.loading
);
