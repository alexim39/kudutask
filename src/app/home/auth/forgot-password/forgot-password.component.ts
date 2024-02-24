import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {ForgotPasswordInterface} from './forgot-password.interface';
import {ForgotPasswordService} from './forgot-password.service';

@Component({
  selector: 'kudutask-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  public form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private forgotPasswordService: ForgotPasswordService
  ) { }

  onSubmit(forgotPassword: ForgotPasswordInterface) {

    // push into list
    this.subscriptions.push(
      this.forgotPasswordService.forgotPassword(forgotPassword).subscribe((res) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        })
      })
    )
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.email
        ], updateOn: 'change' }),
      
    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
