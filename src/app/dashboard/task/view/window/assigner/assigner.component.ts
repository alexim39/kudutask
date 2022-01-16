import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import {TaskInterface} from '../../../task.interface';
import {UserInterface} from '../../../../../common/user/user.interface';
import {UserService} from '../../../../../common/user/user.service';
import {AssignerService} from './assigner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AssignTaskInterface,} from '../../../assign/assign.interface';
import {UserAcknoledgmentInterface, UserProgressReportInterface, UserMarkTaskAsComplete} from './assigner.interface';
import {TaskService} from '../../../task.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-assigner',
  templateUrl: './assigner.component.html',
  styleUrls: ['./assigner.component.scss', './assigner.mobile.scss']
})
export class AssignerComponent implements OnInit, OnDestroy  {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  @Input() task: TaskInterface;
  
  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    private snackBar: MatSnackBar,
    private assigner: AssignerService,
  ) {  }

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
