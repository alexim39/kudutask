import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {NewPasswordInterface} from './new-password.interface';
import {NewPasswordService} from './new-password.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  userId: string;

  passwordHide = true;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private newPasswordService: NewPasswordService
  ) { }

  onSubmit(newPasswordObj: NewPasswordInterface) {

    newPasswordObj['userId'] = this.userId;

    // push into list
    this.subscriptions.push(
      this.newPasswordService.change(newPasswordObj).subscribe((res) => {

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
        });
      })
    )
    
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.form = new FormGroup({
      password: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
        ], updateOn: 'change' 
      }),
      
    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
