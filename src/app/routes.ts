import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

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
  // {
  //   path: 'user',
  //   canActivate: [UserGuard],
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'profile'
  //     },
  //     {
  //       path: 'profile',
  //       component: ProfileComponent
  //     },
  //   ]
  // },
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