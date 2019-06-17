import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule
} from "@angular/material";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { HomeComponent } from './home/home.component';
import { routes } from './routes';
import { SearchcomponentComponent } from './searchcomponent/searchcomponent.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchcomponentComponent,
    RegisterComponent,
    LoginComponent
  ],
  
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatFormFieldModule,    
    MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
    MatPaginatorModule,  MatInputModule,  MatCardModule, 
    MatButtonModule, MatCheckboxModule,MatIconModule, MatMenuModule,

    RouterModule.forRoot(routes),
    
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
