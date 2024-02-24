import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { SignInInterface } from './sign-in.interface';
import { SignInService } from './sign-in.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ResponseInterface } from './../../../common/server/response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', './sign-in.mobile.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  passwordHide = true;
  form: FormGroup;


  constructor(
    private signInService: SignInService,
    private snackBar: MatSnackBar,
    private route: Router,
    ) { }

  public onSignIn(formObject: SignInInterface): void {

    // push into list
    this.subscriptions.push(
      this.signInService.signIn(formObject).subscribe((res: ResponseInterface) => {

        if (res.code === 200) {
          localStorage.setItem('token', res.obj);

          // redirect to dashboard
          this.route.navigate(['/dashboard']);

        }
      }, (error: ErrorEvent) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
      })
    )

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      })
    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
