import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CyrillicValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (value === null || value === undefined || value.trim() === '') {
      return null;
    }
    const hasCyrillic = /[а-яА-Я]/.test(value);
    return hasCyrillic ? { cyrillic: true } : null;
  };
}
