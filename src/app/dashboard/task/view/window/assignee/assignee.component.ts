import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import {TaskInterface} from '../../../task.interface';
import {UserInterface} from '../../../../../common/user/user.interface';
import {UserService} from '../../../../../common/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-assignee',
  templateUrl: './assignee.component.html',
  styleUrls: ['./assignee.component.scss', './assignee.mobile.scss']
})
export class AssigneeComponent implements OnInit,  OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  @Input() task: TaskInterface

  


  constructor(
    private userService: UserService,
  ) { 
   }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
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
