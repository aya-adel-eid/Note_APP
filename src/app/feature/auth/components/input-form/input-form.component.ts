import { Component, forwardRef, input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatInputModule,
  MatError,
  MatHint,
  MatLabel,
  MatFormField,
  MatInput,
} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
@Component({
  selector: 'app-input-form',
  imports: [MatError, MatHint, MatLabel, MatFormField, MatInput, MatInputModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
})
export class InputFormComponent implements ControlValueAccessor {
  placeholder = input<string>('');
  type = input<string>('');
  iD = input<string>('');
  control = input<AbstractControl | null>(null);
  label = input<string>('');
  formGroup = input<FormGroup | null>(null);
  value: string = '';
  onChange = (val: string) => {};
  onTouched = () => {};
  disabled = false;
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
