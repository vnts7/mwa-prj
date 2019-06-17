import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mwa-prj';
  constructor(public auth:AuthService, public router: Router){}
  get user(){
    return this.auth.user;
  }
  logout(){
    console.log(this.user);
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
