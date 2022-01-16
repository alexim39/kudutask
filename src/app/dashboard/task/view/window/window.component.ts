import { Component, OnInit, OnDestroy } from '@angular/core';
import {TaskInterface} from '../../task.interface';
import {UserInterface} from '../../../../common/user/user.interface';
import {UserService} from '../../../../common/user/user.service';
import {ActivatedRoute, Router} from '@angular/router'
import {TaskService} from '../../task.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-window-view',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  isOwer: boolean;
  owner: string;
  task: TaskInterface;
  isEmptyResponse: boolean;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    private route: ActivatedRoute,
  ) { 
    this.isEmptyResponse = false;
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    const taskId: string = this.route.snapshot.paramMap.get('id');

    // get current user tasks
    this.userTask(taskId);

  }


  private userTask(taskId: string) {

    // push into list
    this.subscriptions.push(
      // get task assigness
      this.taskService.getTask(taskId).subscribe((res) => {

        if (res.code === 200) {
          
          // check for empty
          if(res.obj.length == 0) {
            this.isEmptyResponse = true;
          } else {
            
            // check the task owner
            if (this.user._id === res.obj.creator) {
              this.owner = 'You';
              this.isOwer = true;
            } else {
              this.isOwer = false;
            }

            this.task = res.obj;
          }
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
