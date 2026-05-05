import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { InputFormComponent } from '../input-form/input-form.component';

import { Router, RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { logInAction } from '../../state/auth.actions';

import { loadingSpinnerAction } from '../../../../shared/loadingSpinnerState/loadingSpinner.action';
import { selectStatue } from '../../../../shared/loadingSpinnerState/loadingSpinner.selector';

@Component({
  selector: 'app-login-form',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    InputFormComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,

    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authServices = inject(AuthService);
  private readonly router = inject(Router);
  private readonly stateStore = inject(Store);
  loading = this.stateStore.selectSignal(selectStatue);
  loginForm!: FormGroup;
  constructor() {
    this.signIn();
  }
  signIn() {
    this.loginForm = this.fb.group({
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
    });
  }
  logIn() {
    if (this.loginForm.valid) {
      this.stateStore.dispatch(loadingSpinnerAction({ statue: true }));
      this.stateStore.dispatch(logInAction(this.loginForm.value));
    }

    // this.authServices
    //   .logIn(this.loginForm.value)
    //   .pipe(
    //     tap((resp) => {

    //       this.stateStore.dispatch(AuthAction.logInAction(resp));
    //     }),
    //   )
    //   .subscribe({
    //     next: (resp) => {
    //       localStorage.setItem(STORED_KYE.TOKEN, resp.token);
    //       this.router.navigateByUrl('/note');
    //     },
    //     error: (error: HttpErrorResponse) => {},
    //   });
  }
}
