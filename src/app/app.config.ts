import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { appReducer } from './store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { IndividualsEffects } from './store/individuals-store/individual.effects';
import { LegalEntitiesEffects } from './store/legal-entities-store/legal-entity.effects';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './db.config';
import { AngularIbanModule } from 'angular-iban';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot(appReducer),
      EffectsModule.forRoot([IndividualsEffects, LegalEntitiesEffects]),
      BrowserAnimationsModule,
      NgxIndexedDBModule.forRoot(dbConfig),
      AngularIbanModule
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
