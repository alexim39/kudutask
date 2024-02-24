import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../common/user/user.service';
import {UserInterface} from './../../common/user/user.interface';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {FeedbackInterface} from './feedback.interface';
import {FeedbackService} from './feedback.service';
import { FormsManager } from 'src/app/common/service/forms-manager.service';


@Component({
  selector: 'kudutask-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss', './feedback.mobile.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  feedbackForm: FormGroup;
  user: UserInterface;

  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    private feedback: FeedbackService,
    private formsManager: FormsManager
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
        //this.isActive = this.user.isActive;
      })
    )

    this.feedbackForm = new FormGroup({
      tellUsAbout: new FormControl('', {validators: 
        [
          Validators.required,
          //Validators.pattern('[A-Za-z]{2,80}')
        ], updateOn: 'change'
      }),
      feedbackMsg: new FormControl('', {validators: 
        [
          Validators.required,
          //Validators.pattern('[A-Za-z]{2,80}'),
        ], updateOn: 'change'
      }),
      reply: new FormControl(false),
    })
  }

  onSubmit(feedbackObj: FeedbackInterface){

    // attach the user id
    feedbackObj['userId'] = this.user._id;
    
    // push into list
    this.subscriptions.push(
      this.feedback.create(feedbackObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
          
          // reset form
          this.formsManager.resetForm(this.feedbackForm);
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
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
