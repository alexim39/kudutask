import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormsManager {

  constructor() { }

 // you can put this method in a module and reuse it as needed
 resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

}