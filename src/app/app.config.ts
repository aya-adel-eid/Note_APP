import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { provideState, provideStore, Store, USER_RUNTIME_CHECKS } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './feature/auth/state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { authEffect } from './feature/auth/state/auth.effects';
import { spinnerInterceptor } from './core/interceptors/spinner-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NotesEffects } from './feature/note/state/note.effects';
import { noteReducer } from './feature/note/state/note.reducer';
import { provideToastr } from 'ngx-toastr';
import { loadingSpinnerReducer } from './shared/loadingSpinnerState/loadingSpinner.reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { allNotesReducer } from './feature/note/AllNotesState/AllNotes.reducer';
import { AllNotesEffect } from './feature/note/AllNotesState/AllNotes.effects';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, spinnerInterceptor])),
    provideStore({ router: routerReducer }),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'Notes', reducer: noteReducer }),
    provideState({ name: 'AllNotes', reducer: allNotesReducer }),
    provideState({ name: 'loading', reducer: loadingSpinnerReducer }),
    provideEffects([authEffect, NotesEffects, AllNotesEffect]),
    provideToastr(),
    provideRouterStore(),
  ],
};
