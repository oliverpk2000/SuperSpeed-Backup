import {AbstractControl, ValidationErrors} from "@angular/forms";

/** written by Tobias Sprecher */

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  const inputDate = new Date(control.value);
  const today = new Date();
  return today.getTime() > inputDate.getTime() ? null: {invalidDate: inputDate};
}
