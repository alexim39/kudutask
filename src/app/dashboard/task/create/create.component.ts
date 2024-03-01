import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../../common/user/user.service';
import {UserInterface} from './../../../common/user/user.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {CreateTaskService} from './create.service';
import {CreateTaskInterface} from './create.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {Communicator, CommunicatorInterface} from './../../../common/service/communicator.service';

@Component({
  selector: 'kudutask-create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', './create.mobile.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;

  minDate: Date = new Date();

  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  NewTaskForm: FormGroup;

  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar, 
    private createTask: CreateTaskService, 
    public thisDialogRef: MatDialogRef<CreateComponent>,
    private communicator: Communicator
    ) {
  }
  
  onSubmit(newTaskObj: CreateTaskInterface) {

    // attach date rage value
    newTaskObj['start'] = this.range.value.start;
    newTaskObj['end'] = this.range.value.end;
    newTaskObj['creator'] = this.user._id;

    // check that task start and end dates are not empty
    if (newTaskObj.start instanceof Date && newTaskObj.end instanceof Date) {
     
      // push into list
      this.subscriptions.push(
        this.createTask.create(newTaskObj).subscribe((res: any) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
    
            // close dialog
            this.thisDialogRef.close();

            const communicate: CommunicatorInterface = {
              refresh: true,
              obj: res.obj
            }
            // reload table in view component
            this.communicator.triggerChanges(communicate);
          }
        }, (error) => {
          this.snackBar.open(`${error.error}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
    
      );

    } else {
      this.snackBar.open(`Task start and end date are required`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
    }
   
  }

  ngOnInit(): void {

    // form group object
    this.NewTaskForm = new FormGroup({
      title: new FormControl('', {validators: 
        [
          Validators.required,
        ], updateOn: 'change'
      }),
      description: new FormControl(),
      priority: new FormControl('normal')
    })

    // get current user
    this.userService.getUser.subscribe((user) => {
      this.user = user;
    })

  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

