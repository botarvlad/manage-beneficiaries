import { createReducer, on } from '@ngrx/store';
import { Individual } from '../../models/individual.model';
import * as IndividualActions from './individual.actions';

export interface IndividualState {
  individuals: Individual[];
  loading: boolean;
  error: string | null;
}

const initialState: IndividualState = {
  individuals: [],
  loading: false,
  error: null,
};

export const individualReducer = createReducer(
  initialState,
  on(IndividualActions.loadIndividuals, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.loadIndividualsSuccess, (state, { individuals }) => ({
    ...state,
    individuals: [...individuals],
    loading: false,
    error: null,
  })),
  on(IndividualActions.loadIndividualsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(IndividualActions.loadIndividual, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.loadIndividualSuccess, (state, { individual }) => ({
    ...state,
    individuals: [individual],
    loading: false,
    error: null,
  })),
  on(IndividualActions.loadIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(IndividualActions.addIndividual, (state, { individual }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.addIndividualSuccess, (state, { individual }) => ({
    ...state,
    individuals: [...state.individuals, individual],
    loading: false,
    error: null,
  })),
  on(IndividualActions.addIndividualFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(IndividualActions.updateIndividual, (state, { individual }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.updateIndividualSuccess, (state, { individual }) => ({
    ...state,
    individuals: state.individuals.map((existingIndividual) =>
      existingIndividual.id === individual.id ? individual : existingIndividual
    ),
    loading: false,
    error: null,
  })),
  on(IndividualActions.updateIndividualFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(IndividualActions.deleteIndividual, (state, { id }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IndividualActions.deleteIndividualSuccess, (state, { id }) => ({
    ...state,
    individuals: state.individuals.filter((individual) => individual.id !== id),
    loading: false,
    error: null,
  })),
  on(IndividualActions.deleteIndividualFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
