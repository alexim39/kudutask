import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewService } from '../view.service';
import { UserInterface } from '../../../../common/user/user.interface';
import { UserService } from '../../../../common/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskInterface } from '../../task.interface';
import { AssignComponent } from '../../assign/assign.component';
// declare jquery as any
declare const $: any;
import { ShareComponent } from '../../share/share.component';
import { DialogService } from './dialog.service';
import { TaskService } from '../../task.service';
import { Subscription } from 'rxjs';
import { Communicator } from './../../../../common/service/communicator.service';

@Component({
  selector: 'kudutask-dialog-view',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss', './dialog.mobile.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  panelOpenState = false;
  isCompleted: boolean = false;
  isOwner: boolean;
  user: UserInterface;

  // mark task as open
  isMakeOpen: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public task: TaskInterface,
    private snackBar: MatSnackBar,
    private userService: UserService,
    //private viewTask: ViewService,
    public assignTaskDialogRef: MatDialog,
    public shareTaskDialogRef: MatDialog,
    private thisDialogRef: MatDialogRef<DialogComponent>,
    private taskDetails: DialogService,
    private taskService: TaskService,
    //private communicator: Communicator
  ) {  }

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

  }

/*   deleteTask(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.viewTask.delete(id).subscribe((res) => {

          if (res.code === 200) {

            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // close dialog
            this.thisDialogRef.close()
            // reload table in view component
            this.communicator.triggerChanges('triggered');
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )

    }
  } */

  /* // first time task assignment dialog
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
  } */

/*   archiveTaskDialog(task: TaskInterface) {
    const confirmArchive = confirm("By archiving this task, people related to it will not be able to mark it as completed or pending");

    if (confirmArchive) {

      const archive = {
        taskId: task._id,
        isArchive: true
      }

      // push into list
      this.subscriptions.push(
        this.taskDetails.archive(archive).subscribe((res) => {

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
  } */

  

 /*  markTaskAs(taskId: string, status: string) {
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

  } */

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
