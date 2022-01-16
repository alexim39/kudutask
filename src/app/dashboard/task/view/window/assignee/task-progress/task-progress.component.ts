import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import {TaskInterface} from '../../../../task.interface';
import {UserInterface} from '../../../../../../common/user/user.interface';
import {UserService} from '../../../../../../common/user/user.service';
import {AssigneeService} from './../assignee.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatStepper} from '@angular/material/stepper';
import {RemoveAssigneeInterface,} from '../../../../assign/assign.interface';
import {AssignService} from '../../../../assign/assign.service';
import { Router } from '@angular/router';
import {UserAcknoledgmentInterface, UserProgressInterface, taskMessages, UserMarkTaskAsComplete} from './../assignee.interface';
import {TaskService} from '../../../../task.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-task-progress',
  templateUrl: './task-progress.component.html',
  styleUrls: ['./task-progress.component.scss']
})
export class TaskProgressComponent implements OnInit,  AfterViewInit, OnDestroy  {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  @Input() task: TaskInterface

  taskMessages: Array<taskMessages> = [];

  // acknoledgement
  isUnderstandTask: boolean = false;
  isHaveInfo: boolean = false;
  isStartTask: boolean = false;
  isDeclinedTask: boolean = false;

  minDate: Date = new Date();

  // task progress
  isEncounterChallenge: boolean = false;

  // task complete
  isTaskCompleted: boolean = false;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    private snackBar: MatSnackBar,
    private assignTask: AssignService,
    private assignee: AssigneeService,
    private route: Router,
    private cdRef : ChangeDetectorRef 
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )
  }

  ngAfterViewInit() {
    this.setAcknoledgement();
  }

  private setAcknoledgement() {
    // get user task acknolegement if available

    this.task.progress.forEach((pregress) => {

      if (this.user._id === pregress.assignee._id) {

        if (pregress.isStartTask) {

          this.isHaveInfo = pregress.isHaveInfo;
          this.isStartTask = pregress.isStartTask;
          this.isUnderstandTask = pregress.isUnderstandTask;
          
          // move to next step
          this.stepper.next();

          if (pregress.isTaskComplete === 'Completed') {
            this.isTaskCompleted = true;
            // move to next step
            this.stepper.selectedIndex = 2; 
          } 
          
          if (pregress.isDeclinedTask === true) {
  
            this.isDeclinedTask = pregress.isDeclinedTask;
            this.stepper.selectedIndex = 1; 
          }
  
        } 
      }
    })
    this.cdRef.detectChanges();
  }

    // user task assignment acknolegment
    onAcknoledgeTask(taskId: string, declineValue: boolean = false): void {

      const acknowledgement: UserAcknoledgmentInterface = {
        isStartTask: this.isStartTask,
        isHaveInfo: this.isHaveInfo,
        isUnderstandTask: this.isUnderstandTask,
        isDeclinedTask: declineValue,
        userId: this.user._id,
        taskId: taskId
      }
  
      // push into list
      this.subscriptions.push(
        this.assignee.acknowledgeTask(acknowledgement).subscribe((res) => {
  
          if (res.code === 200) {
  
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
            // move to next step
            this.stepper.next();
  
          }
        }, (error)=> {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )
    }

  onDecline(taskId: string) {

    const removeObj: RemoveAssigneeInterface = {
      assigneeId: this.user._id,
      taskId: taskId
    }

    const confirmDelete = confirm("By declining, you will be automatically removed from this task thread");
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.assignTask.removeAssignee(removeObj).subscribe((res) => {
          if (res.code === 200) {

            // go ahead to inform task owner about assignee decline
            this.onAcknoledgeTask(taskId, true);
    
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // redirect user to task list
            this.route.navigateByUrl(`/dashboard/tasks`);
    
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

  // submit progress report
  onProgressSubmit(tentativeDate: Date, comments: string, taskId: string) {

    const reportObj: UserProgressInterface = {
      isEncounterChallenge: this.isEncounterChallenge,
      comments: comments,
      tentativeDate: tentativeDate,
      taskId: taskId,
      userId: this.user._id
    }

    // push into list
    this.subscriptions.push(
      this.assignee.sendProgressReport(reportObj).subscribe((res) =>{
        if (res.code === 200) {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

        } else {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });

        }
      })
    )
  }

  // mark task as complete
  onMarkTaskAsCompleted() {
    const taskCompleteObj: UserMarkTaskAsComplete = {
      isTaskCompleted: this.isTaskCompleted,
      userId: this.user._id,
      taskId: this.task._id
    }

    // push into list
    this.subscriptions.push(
      this.assignee.markTaskAsComplete(taskCompleteObj).subscribe((res) => {
        if (res.code === 200) {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

        } else {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });

        }
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
