import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { TeamInterface } from '../../..//team/team.interface';
import { UserService } from './../../../../common/user/user.service';
import { UserInterface } from './../../../../common/user/user.interface'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TaskInterface } from '../../..//task/task.interface';


@Component({
  selector: 'kudutask-shared-tasks',
  templateUrl: './shared-tasks.component.html',
  styleUrls: ['./shared-tasks.component.scss']
})
export class SharedTasksComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  @Input() teams: Array<TeamInterface>;
  members: UserInterface[] = []
  user: UserInterface;
  tasks: Array<TaskInterface> = [];

  displayedColumns: string[] = ['title', 'status', 'priority', 'timeline', 'owner'];
  dataSource: TaskInterface[] = [];
  //dataSource = new MatTableDataSource<Task>(this.tasks);

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    this.subscriptions.push(

      // get team id from route and loop throught to fetch specific team
      this.activatedRoute.params.subscribe(params => {
        const teamId: string = params['id'];

        // loop through array to find a match for id
        this.teams.filter((team: TeamInterface) => {

          if (team._id == teamId) {
            this.members = team.members; // members of team

            team.sharedTasks.forEach((tasks) => {

              // check the task owner
              if (this.user._id === tasks.creator) {
                tasks.owner = 'You';
                tasks.isOwer = true;
              } else {
                tasks.isOwer = false;

                this.subscriptions.push(
                  // get task owner from user service
                  this.userService.getUsers().subscribe((users) => {

                    users.obj.forEach((user: UserInterface) => {
                      if (tasks.creator === user._id) {
                        tasks.owner = user.firstname;
                      }
                    });

                  })
                )
              }
              this.tasks.push(tasks)
            })

            this.dataSource = team.sharedTasks
          }

        })

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
