import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, PreloadAllModules, withPreloading } from '@angular/router';import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http'; // Importar provider HTTP

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient() // Habilitar el cliente HTTP globalmente
  ],
});