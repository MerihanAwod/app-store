import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router'; // If you're using routing
import { AppComponent } from './app/app.component'; // Your root component
import { routes } from './app/app.routes'; // Your routes (if applicable)
import { importProvidersFrom } from '@angular/core'; // For standalone components
import { GraphQLModule } from './app/graphql.module';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router'; // If you're using routing
import { AppComponent } from './app/app.component'; // Your root component
import { routes } from './app/app.routes'; // Your routes (if applicable)
import { importProvidersFrom } from '@angular/core'; // For standalone components
import { GraphQLModule } from './app/graphql.module';


platformBrowserDynamic().bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(GraphQLModule), // Import GraphQLModule here
    provideRouter(routes) // If you're using routing
  ]
})
  .catch(err => console.error(err));
