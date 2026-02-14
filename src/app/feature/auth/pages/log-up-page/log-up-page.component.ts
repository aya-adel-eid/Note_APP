import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LogupFormComponent } from '../../components/logup-form/logup-form.component';

@Component({
  selector: 'app-log-up-page',
  imports: [LoginFormComponent, LogupFormComponent],
  templateUrl: './log-up-page.component.html',
  styleUrl: './log-up-page.component.css',
})
export class LogUpPageComponent {}
