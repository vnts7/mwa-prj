import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

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
    path: 'user',
    //canActivate: [UserGuard],
    children: [ 
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full'
      },
    ]
  },
  // {
  //   path: 'admin',
  //   canActivate: [AdminGuard],
  //   children: [
  //     {
  //       path: ''
  //     },
  //   ]
  // }
];