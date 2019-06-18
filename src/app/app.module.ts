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
  MatMenuModule,
  MatSelectModule,
  MatTabsModule
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
import { ProfileComponent } from './profile/profile.component';
import { GenderPipe } from './pipe/gender.pipe';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchcomponentComponent,
    RegisterComponent,
    LoginComponent,
    GenderPipe,
    ProfileComponent,
    AboutUsComponent,
    
  ],
  
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatFormFieldModule, MatSelectModule,
    MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
    MatPaginatorModule,  MatInputModule,  MatCardModule, MatTabsModule,
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
