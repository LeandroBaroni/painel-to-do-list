import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './routes/app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { urlInterceptor } from '@interceptors/url.interceptor';
import { apiErrorInterceptor } from '@interceptors/api-error.interceptor';
import { jwtInterceptor } from '@interceptors/jwt.interceptor';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { errorTailorConfig } from '@resources/errorTailorConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@environments/environment';
import { ToastrModule } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideErrorTailorConfig(errorTailorConfig),
    provideHttpClient(
      withFetch(),
      withInterceptors([ urlInterceptor, apiErrorInterceptor, jwtInterceptor ])
    ),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })
    ),
  ]
};
