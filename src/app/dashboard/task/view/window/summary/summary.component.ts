import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../../../common/user/user.service';
import { UserInterface } from '../../../../../common/user/user.interface';
import { Task, Assign, Progress } from './summary.interface';

@Component({
  selector: 'kudutask-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() task: Task;
  user: UserInterface;
  assignedTask: Assign;
  progressReports: Progress[] = [];
  pendingReports: Progress[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //console.log(this.task)

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    /* Assignee who have started task */
    this.task.progress.forEach((progress) => {
      this.progressReports.push({
        assignee: progress.assignee,
        challenges: progress.challenges,
        isDeclinedTask: progress.isDeclinedTask,
        isHaveInfo: progress.isHaveInfo,
        isStartTask: progress.isUnderstandTask,
        isUnderstandTask: progress.isUnderstandTask,
        startDate: progress.startDate,
        taskCompleteDate: progress.taskCompleteDate,
        isTaskComplete: progress.isTaskComplete
      });
    })

    /* Assignee with pending task */
    // conpare assigned task array and progress array
    // to find assignee yet to start task
    const oneIDs = this.task.progress.map((progress: Progress) => { return progress.assignee._id });
    const assigneeWithPendingTask = this.task.assigned.assignees.filter((assignee: UserInterface) => {
      return oneIDs.indexOf(assignee._id) === -1;
    });
    // loop through returned arrays with only pendting task assignees
    assigneeWithPendingTask.forEach((assignee: UserInterface) => {
      this.pendingReports.push({
        assignee: assignee,
        challenges: undefined,
        isDeclinedTask: undefined,
        isHaveInfo: undefined,
        isStartTask: false,
        isUnderstandTask: undefined,
        startDate: undefined,
        taskCompleteDate: undefined,
        isTaskComplete: 'Pending'
      })
    })

  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
