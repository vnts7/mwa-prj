import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private u: UserService) { }

  ngOnInit() {
  }

  passwordsMatchValidator(control: FormControl): ValidationErrors {
    let password = control.root.get('password');
    return password && control.value !== password.value ? {
      passwordMatch: true
    } : null;
  }

  form = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator])
  });
  get email(): any { return this.form.get('email'); }
  get repeatPassword(): any { return this.form.get('repeatPassword'); }
  submit(e) {
    if (this.form.invalid) return false;
    const u = this.form.getRawValue();
    delete u.repeatPassword;
    this.u.register(u).subscribe(data => {
      console.log(data);
    });
    return false;
  }

}
