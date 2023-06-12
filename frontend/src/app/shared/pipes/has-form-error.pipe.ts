import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'hasFormError'
})
export class HasFormErrorPipe implements PipeTransform {

  transform(formGroup: FormGroup, controlName: string, error: string): boolean {
    console.log('called');
    const control = formGroup.get(controlName);
    if (!control || !control.errors) {
      return false;
    }
    return control.errors[error] && control.touched;
  }

}
