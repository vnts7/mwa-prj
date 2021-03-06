import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TrackerComponent } from './tracker/tracker.component';
import { Chart2Component } from './chart2/chart2.component';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'tracker',
        component: TrackerComponent
      },
      {
        path: 'chart',
        component: Chart2Component
      },
    ]
  },
];