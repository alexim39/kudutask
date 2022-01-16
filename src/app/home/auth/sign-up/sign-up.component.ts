import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {SignUpInterface} from './sign-up.interface';
import {SignUpService} from './sign-up.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {ResponseInterface} from './../../../common/server/response.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'kudutask-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', './sign-up.mobile.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  passwordHide = true;
  form: FormGroup;

  constructor(private signUpService: SignUpService,
    private route: Router,
    private snackBar: MatSnackBar) { }

  onSignUp(formObject: SignUpInterface): void {
    // push into list
    this.subscriptions.push(
      this.signUpService.signUp(formObject).subscribe((res: ResponseInterface) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
          // redirect to sign in
          this.route.navigate(['/signin']);
          // reset form
          //this.reset();
        } 
        
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
      })
    )    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      lastname: new FormControl('', {validators: 
        [
          Validators.required,
          Validators.pattern('[A-Za-z]{2,80}')
        ], updateOn: 'change'
      }),
      firstname: new FormControl('', {validators: 
        [
          Validators.required,
          Validators.pattern('[A-Za-z]{2,80}'),
          //this.ageValidator
        ], updateOn: 'change'
      }),
      email: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.email
        ], updateOn: 'change' 
      }),
      password: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
        ], updateOn: 'change' 
      }),
      tnc: new FormControl(false, {validators: 
        [
          Validators.requiredTrue
        ]
      }),
    })
  }

  /* private reset(): void {
    this.form.reset();
    this.form.controls['lastname'].setErrors(null);
    this.form.controls['firstname'].setErrors(null);
    this.form.controls['password'].setErrors(null);
    this.form.controls['email'].setErrors(null);
  } */

  /* ageValidator(control: AbstractControl): {[key: string]: boolean} | null {

    if ( control.value !==null && (isNaN(control.value) || control.value <20  || control.value> 70)){
      return {'ageValidator': true}
    }
    return null;
  } */


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
