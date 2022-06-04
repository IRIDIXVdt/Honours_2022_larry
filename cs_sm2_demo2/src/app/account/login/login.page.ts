import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public errorMessages = {
    email: [
      {
        type: 'required', message: 'Email is required.'
      },
      {
        type: 'pattern', message: 'Please enter a valid email address.'
      }
    ],
    password: [
      {
        type: 'required', message: 'Password is required.'
      },
      {
        type: 'minlength', message: 'Your password should be more than 6 character.'
      },
      {
        type: 'maxlength', message: 'Your password should be less than 20 character.'
      },
    ]
  }

  signInForm: FormGroup;
  constructor(
    // public authService: AuthService
  ) {
    this.signInForm = new FormGroup({
      formEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      formPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ])
    });
  }

  ngOnInit() {}
}
