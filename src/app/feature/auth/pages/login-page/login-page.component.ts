import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { BaseInputComponent } from '../../components/base-input/base-input.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, BaseInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {}
