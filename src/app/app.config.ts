import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { provideState, provideStore, USER_RUNTIME_CHECKS } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './feature/auth/state/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { authEffect } from './feature/auth/state/auth.effects';
import { spinnerInterceptor } from './core/interceptors/spinner-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NotesEffects } from './feature/note/state/note.effects';
import { noteReducer } from './feature/note/state/note.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, spinnerInterceptor])),
    provideStore(),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'Notes', reducer: noteReducer }),
    provideEffects([authEffect, NotesEffects]),
  ],
};
