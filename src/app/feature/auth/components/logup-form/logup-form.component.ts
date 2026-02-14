import { Component, inject } from '@angular/core';
import { InputFormComponent } from '../input-form/input-form.component';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { MatCardModule, MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from 'console';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-logup-form',
  imports: [
    InputFormComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatAnchor,
    RouterLink,
  ],
  templateUrl: './logup-form.component.html',
  styleUrl: './logup-form.component.css',
})
export class LogupFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authServices = inject(AuthService);
  registerForm!: FormGroup;
  constructor() {
    this.signUP();
  }
  signUP() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
          ),
        ],
      ],
      age: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01{0125}{0-9}{8}/)]],
    });
  }
  logUP() {
    this.authServices.logUp(this.registerForm.value).subscribe({
      next: (resp) => {},
      error: (error: HttpErrorResponse) => {},
    });
  }
}
