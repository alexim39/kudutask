import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {UserInterface} from '../../../../../common/user/user.interface';
import {UserService} from '../../../../../common/user/user.service';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {TaskInterface} from '../../../task.interface';
import {ViewService} from '../../view.service';
import {DialogComponent} from '../dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-update-task',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() task: TaskInterface;

  panelOpenState = false;

  isOwner: boolean;
  priority: string;
  user: UserInterface;

  range: FormGroup = new FormGroup({
    start: new FormControl('', []),
    end: new FormControl('', [])
  });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private viewTask: ViewService,
    private thisDialogRef: MatDialogRef<DialogComponent>, ) { }

  ngOnInit(): void {

    this.userService.getUser.subscribe((user) => {
      this.user = user;
    });

    // check task owner
    if (this.user._id === this.task.creator) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }

  }

   // set priority value
   radioChange(event: any) {
    if (event.value === undefined) {
      this.priority = 'normal';
    } else {
      this.priority = event.value;
    }
  } 


  taskSubmit(id: string, title: string, description: string) {
    // get for priority value
    let priority: string;
    if (this.priority === undefined) {
      priority = 'normal';
    } else {
      priority = this.priority;
    }

    // attach date rage value
    const taskObj: TaskInterface = {
      _id: id,
      creator: this.user._id,
      title: title,
      description: description,
      priority: priority,
      start: this.range.value.start,
      end: this.range.value.end
    }

    // push into list
    this.subscriptions.push(
      this.viewTask.update(taskObj).subscribe((res) => {

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
