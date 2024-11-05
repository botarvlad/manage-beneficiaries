import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cuiValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cui = control.value;

    // Verifică dacă CUI-ul are între 2 și 10 cifre
    const cuiPattern = /^[0-9]{2,10}$/;
    if (!cuiPattern.test(cui)) {
      return { invalidCUI: true };
    }

    // Verifică cifra de control
    const checkControlDigit = (cui: string): boolean => {
      const base = '753217532';
      const cuiDigits = cui.padStart(10, '0'); // Completează cu zero-uri la stânga pentru 10 cifre
      let sum = 0;

      for (let i = 0; i < 9; i++) {
        sum += +cuiDigits[i] * +base[i];
      }

      const remainder = sum % 11;
      const controlDigit = remainder === 10 ? 0 : remainder;

      return controlDigit === +cuiDigits[9];
    };

    if (cui.length === 10 && !checkControlDigit(cui)) {
      return { invalidCUI: true };
    }

    return null;
  };
}
