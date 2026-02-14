import {
  Component,
  input,
  InputSignal,
  InputSignalWithTransform,
  model,
  ModelSignal,
  OutputRef,
  signal,
} from '@angular/core';
import { MatFormField, MatLabel, MatError, MatInput } from '@angular/material/input';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatAnchor } from '@angular/material/button';
@Component({
  selector: 'app-base-input',
  imports: [MatFormField, MatLabel, FormField, MatError, MatAnchor, MatInput],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.css',
})
export class BaseInputComponent {
  loginModel = signal({
    email: '',
    password: '',
  });
  logInForm = form(this.loginModel, (schemaPath) => {
    (required(schemaPath.email, { message: 'Email is required' }),
      email(schemaPath.email, { message: 'Enter a valid email address' }),
      required(schemaPath.password, { message: 'password is required' }));
  });

  logIn() {
    console.log(this.logInForm().value());
  }
}
