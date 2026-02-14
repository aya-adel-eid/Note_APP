import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';
import { logInAction } from './feature/auth/state/auth.actions';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Not_App');
  private readonly state = inject(Store);
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly platId = inject(PLATFORM_ID);
  private readonly spinner = inject(NgxSpinnerService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
      // this.spinner.show('ball-beat');
    });
    this.state.subscribe((state) => console.log(state));
    if (isPlatformBrowser(this.platId)) {
      const msg = localStorage.getItem('msg');
      if (msg) {
        this.state.dispatch(logInAction({ msg: msg }));
      }
    }
  }
}
