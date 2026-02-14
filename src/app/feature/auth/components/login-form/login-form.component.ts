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
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { STORED_KYE } from '../../../../core/constance/STORED_KYES';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { logInAction } from '../../state/auth.actions';
import { AuthAction } from '../../state/actions-type';

@Component({
  selector: 'app-login-form',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    InputFormComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatAnchor,
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
    this.authServices
      .logIn(this.loginForm.value)
      .pipe(
        tap((resp) => {
          // {
          //   type: 'login page',
          //   payload: {
          //     resp: resp,
          //   },
          // }
          this.stateStore.dispatch(AuthAction.logInAction(resp));
        }),
      )
      .subscribe({
        next: (resp) => {
          localStorage.setItem(STORED_KYE.TOKEN, resp.token);
          this.router.navigateByUrl('/note');
        },
        error: (error: HttpErrorResponse) => {},
      });
  }
}
