import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'hasFormError'
})
export class HasFormErrorPipe implements PipeTransform {

  transform(formGroup: FormGroup, controlName: string, error: string): boolean {
    return formGroup.get(controlName).hasError(error) && formGroup.get(controlName).touched
  }

}
