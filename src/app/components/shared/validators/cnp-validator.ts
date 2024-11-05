import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cnpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnp = control.value;
    const cnpPattern = /^[1-8][0-9]{12}$/;
    if (!cnpPattern.test(cnp)) {
      return { invalidCNP: true };
    }

    const checkControlDigit = (cnp: string): boolean => {
      const controlWeights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
      const controlSum = cnp
        .slice(0, 12)
        .split('')
        .reduce(
          (sum, digit, index) =>
            sum + parseInt(digit, 10) * controlWeights[index],
          0
        );
      const controlDigit = controlSum % 11 === 10 ? 1 : controlSum % 11;
      return controlDigit === parseInt(cnp[12], 10);
    };

    if (!checkControlDigit(cnp)) {
      return { invalidCNP: true };
    }

    return null;
  };
}
