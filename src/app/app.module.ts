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
  MatDatepickerModule,
  MatListModule,
  MatProgressBarModule,
} from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
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
import { AboutUsComponent } from './about-us/about-us.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MealTypePipe } from './pipes/meal-type.pipe';

import { Chart2Component } from './chart2/chart2.component';
import { ChartsModule } from 'ng2-charts'; 
import { GoalPipe } from './pipes/goal.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchcomponentComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AboutUsComponent,
    TrackerComponent,
    Chart2Component,
    MealTypePipe,
    GoalPipe,
    
  ],
  
  imports: [
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, MatFormFieldModule,    
    MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
    MatPaginatorModule,  MatInputModule,  MatCardModule, 
    MatButtonModule, MatCheckboxModule,MatIconModule, MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatListModule,
    ChartsModule, 
    MatProgressBarModule,
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
