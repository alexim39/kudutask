import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../../common/user/user.service';
import {UserInterface} from './../../../common/user/user.interface';
import { Subscription } from 'rxjs';
import {AccountActivationService} from './account-activation.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'kudutask-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  isActive: boolean;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private accountActivationService: AccountActivationService
  ) { }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
        this.isActive = this.user.isActive;
      })
    )
  }

  // user active notification bar
  closeActivationWarning() {
    this.isActive = true;
  }

  // resend activation link to user email
  resendActivationLink(){
    // push into list
    this.subscriptions.push(
      this.accountActivationService.sendLink(this.user._id).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['success']
        });
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
