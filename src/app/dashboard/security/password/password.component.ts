import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChangePasswordInterface} from './password.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar';
import {PasswordService} from './password.service';
import {UserService} from './../../../common/user/user.service';
import {UserInterface} from './../../../common/user/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  hideOdd = true;
  hideNew = true;
  form: FormGroup;
  user: UserInterface;
  isNotActivatedAccount: boolean;


  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService, 
    private password: PasswordService) { }

  ngOnInit(): void {
    this.userService.getUser.subscribe((user) => {
      this.user = user;

      // disable for if user account is not active
      if (this.user.isActive === false) {
        this.isNotActivatedAccount = true;
      }

    });

    this.form = new FormGroup({

      current: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
        ], updateOn: 'change' 
      }),

      new: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
        ], updateOn: 'change' 
      })

    })

  }

  onChange(forms: FormGroup): void {

    const passwords: ChangePasswordInterface = {
      current: forms.value.current,
      new: forms.value.new,
      userId: this.user._id
    }
    
    // make sure both password are not the same
    if (passwords.current == passwords.new) {
      this.snackBar.open(`New password can't be the same with current password`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
    } else {

      // push into list
      this.subscriptions.push(
        this.password.changePassword(passwords).subscribe((res) => {

          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
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
  } 

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
