import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private u: UserService, private router: Router, private ar: ActivatedRoute) { }
  msg = null;
  ngOnInit() {
  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get email(): any { return this.form.get('email'); }
  submit() {
    this.msg = null;
    console.log('submit', this.ar.snapshot.queryParamMap.get('_r'));
    const user = this.form.getRawValue();
    this.u.login(user).subscribe(r => {
      const url = this.ar.snapshot.queryParamMap.get('_r') || '/'
      if (r.success) return this.router.navigate([url]);
      this.msg = r.message;
    })
    return false;
  }
}
