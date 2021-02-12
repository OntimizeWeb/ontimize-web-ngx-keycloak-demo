import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { APP_CONFIG, O_AUTH_SERVICE, ONTIMIZE_MODULES, ONTIMIZE_PROVIDERS, OntimizeWebModule } from 'ontimize-web-ngx';
import { KeycloakOptions, O_KEYCLOAK_OPTIONS, OKeycloakAuthService, OntimizeKeycloakModule } from 'ontimize-web-ngx-keycloak';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CONFIG } from './app.config';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'http://localhost:8888/auth',
    realm: 'implatform-demo',
    clientId: 'implatform-demo-ui'
  },
  initOptions: {
    onLoad: 'login-required'
  }
};

// Defining custom providers (if needed)...
export const customProviders: any = [
  { provide: O_AUTH_SERVICE, useValue: OKeycloakAuthService },
  { provide: O_KEYCLOAK_OPTIONS, useValue: keycloakOptions }
];

@NgModule({
  imports: [
    ONTIMIZE_MODULES,
    OntimizeWebModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OntimizeKeycloakModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: APP_CONFIG, useValue: CONFIG },
    ONTIMIZE_PROVIDERS,
    ...customProviders
  ],
})
export class AppModule { }
