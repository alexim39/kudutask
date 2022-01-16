import { Component, OnInit, Input, OnDestroy, Inject, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskInterface } from '../../../../task.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../../../../../common/user/user.service';
import { UserInterface } from './../../../../../../common/user/user.interface';
import { ViewService } from './../../../../view/view.service';
import { DialogComponent } from './../../../dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Communicator, CommunicatorInterface } from './../../../../../../common/service/communicator.service';
import {MarkAsInterface} from './controls';
import { TaskService } from '../../../../task.service';
import { Router } from '@angular/router'
import {ControlsService} from './controls.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignComponent } from '../../../../assign/assign.component';
// declare jquery as any
declare const $: any;
import { ShareComponent } from '../../../../share/share.component';


@Component({
  selector: 'kudutask-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss', './controls.mobile.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() task: TaskInterface;
  user: UserInterface;
  isOwner: boolean;
  // mark task as open
  isMakeOpen: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private viewService: ViewService,
    @Optional() private thisDialogRef: MatDialogRef<DialogComponent>, 
    private taskService: TaskService,
    private communicator: Communicator,
    private router: Router,
    public assignTaskDialogRef: MatDialog,
    public shareTaskDialogRef: MatDialog,
    private controlsService: ControlsService
  ) { }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    // check task owner
    if (this.user._id === this.task.creator) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

    // check if task is marked open -  assignees
    if (this.task.assigned.assignees.length !== 0) {
      //console.log(this.task)
      this.isMakeOpen = true;
    } else {
      this.isMakeOpen = false;
    }
    
  }

  deleteTask(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.viewService.delete(id).subscribe((res) => {

          if (res.code === 200) {

            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // close dialog
            this.thisDialogRef.close();
            this.router.navigate(['../../dashboard/tasks/']);
          }
        }, (error: ErrorEvent) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )

    }
  }

  markTaskAs(taskId: string, status: string) {
    const markObj: MarkAsInterface = {
      taskId: taskId,
      status: status
    }


    // push into list
    this.subscriptions.push(
      this.taskService.markTaskAs(markObj).subscribe((res) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });

          // close task details dialog
          this.thisDialogRef.close()
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
      })
    )

  }

  archiveTaskDialog(task: TaskInterface) {
    const confirmArchive = confirm("By archiving this task, people related to it will not be able to mark it as completed or pending");

    if (confirmArchive) {

      const archive = {
        taskId: task._id,
        isArchive: true
      }

      // push into list
      this.subscriptions.push(
        this.controlsService.archive(archive).subscribe((res) => {

          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 8000,
              panelClass: ['success']
            });

            // close dialog
            this.thisDialogRef.close()
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['error']
          });
          // close dialog
          this.thisDialogRef.close()
        })
      )

    } else {
      //console.log('dont archive')
    }
  }

  unarchiveTaskDialog(task: TaskInterface) {
    const unconfirmArchive = confirm("By unarchiving this task, people related to it will be able to mark it as completed or pending");

    if (unconfirmArchive) {

      const archive = {
        taskId: task._id,
        isArchive: false
      }

      // push into list
      this.subscriptions.push(
        this.controlsService.archive(archive).subscribe((res) => {

          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 8000,
              panelClass: ['success']
            });
            // close dialog
            this.thisDialogRef.close()
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['error']
          });
          // close dialog
          this.thisDialogRef.close()
        })
      )

    } else {
      //console.log('dont archive')
    }
  }

  // first time task assignment dialog
  openAssignTaskDialog(task: TaskInterface) {
    // open assign task component dialog
    this.assignTaskDialogRef.open(AssignComponent, { data: task });
    // close task details dialog
    this.thisDialogRef.close()
  }

  // share task dialog
  openShareTaskDialog(task: TaskInterface) {
    // open share task dialog
    this.shareTaskDialogRef.open(ShareComponent, { data: task });
    // close task details dialog
    this.thisDialogRef.close()
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
