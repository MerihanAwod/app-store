import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core'; // For standalone components
import { GraphQLModule } from './app/graphql.module';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

//
// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(GraphQLModule), // GraphQL providers
//     provideRouter(routes), // To add routes?
//   ],
// }).catch((err) => console.error(err));

