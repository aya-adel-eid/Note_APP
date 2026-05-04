import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalcServices {
  sum(x: number, y: number) {
    return x + y;
  }
  sub(x: number, y: number) {
    return x - y;
  }
}
