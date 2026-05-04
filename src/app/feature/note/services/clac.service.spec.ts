import { inject } from '@angular/core';
import { CalcServices } from './calc.service';
import { describe, it, expect } from 'vitest';
describe('calcServices', () => {
  it('shout add tow num', () => {
    const calc = new CalcServices();
    const result = calc.sum(5, 3);
    expect(result).toBe(8);
  });
  it('shout sub tow number', () => {
    const calc = new CalcServices();
    const result = calc.sub(5, 2);
    expect(result).toBe(3);
  });
});
