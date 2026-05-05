import { Component, inject } from '@angular/core';
import { InputFormComponent } from '../input-form/input-form.component';

import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { signUpAction } from '../../state/auth.actions';
import { loadingSpinnerAction } from '../../../../shared/loadingSpinnerState/loadingSpinner.action';
import { selectStatue } from '../../../../shared/loadingSpinnerState/loadingSpinner.selector';
@Component({
  selector: 'app-logup-form',
  imports: [
    InputFormComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,

    RouterLink,
  ],
  templateUrl: './logup-form.component.html',
  styleUrl: './logup-form.component.css',
})
export class LogupFormComponent {
  private readonly fb = inject(FormBuilder);

  private readonly store = inject(Store);
  loading = this.store.selectSignal(selectStatue);
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
    if (this.registerForm.valid) {
      this.store.dispatch(loadingSpinnerAction({ statue: true }));
      this.store.dispatch(signUpAction(this.registerForm.value));
    }
  }
}
