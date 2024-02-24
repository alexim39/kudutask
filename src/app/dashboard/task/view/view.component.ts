import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ViewService} from './view.service';
import {UserInterface} from '../../../common/user/user.interface';
import {UserService} from '../../../common/user/user.service';
import {DialogComponent} from './dialog/dialog.component';
import {TaskInterface} from '../task.interface';
import {MatSort} from '@angular/material/sort';
import {TaskService} from '../task.service';
import { Observable, Subscription } from 'rxjs';
import {Communicator, CommunicatorInterface} from './../../../common/service/communicator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kudutask-view-task',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  tasks: Array<TaskInterface> = [];
  isEmptyResponse: boolean;
  users: Array<UserInterface> = [];

  // init countdown
  countDown: string;
  displayedColumns: string[] = ['title', 'completed', 'priority', 'timeLine', 'owner', 'actions'];
  dataSource = new MatTableDataSource<TaskInterface>(this.tasks);
  

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }

  constructor(
    private taskService: TaskService, 
    private userService: UserService, 
    public dialog: MatDialog, 
    private viewService: ViewService,
    private communicator: Communicator,
    private router: Router
    ) {
    this.isEmptyResponse = false;

    // reload component on trigger from communicator service
    this.subscriptions.push(
      this.communicator.implementChanges().subscribe(res => {
        if (res.refresh) this.reloadComponent();
      })
    )
  }

  private reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    // get all user task
    this.getAllUserTasks(this.user._id);
  }

  // return task progress status in percentage
  getTaskStatusPercentage(task: TaskInterface): string {
    return this.taskService.taskPercentage(task) + '%';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // used to auto init getTasks method 
  private getAllUserTasks(userId: string) {
    // push into list
    this.subscriptions.push(
      this.viewService.getTasks(userId).subscribe((res) => {

        console.log('user task ',res)

        if (res.code === 200) {
  
          // check for empty
          if (res.obj.length == 0) {
            this.isEmptyResponse = true;
          } else {
  
            // sort task by date
            const sorted: TaskInterface[] = res.obj.sort((a: TaskInterface, b: TaskInterface) => {
              const c: number = new Date(a.createDate).getTime();
              const d: number = new Date(b.createDate).getTime();
              return d - c ;
            })
    
            sorted.forEach((tasks: TaskInterface) => {
                         
              // check the task owner
              if (this.user._id === tasks.creator) {
                tasks.owner = 'You';
                tasks.isOwer = true;
              } else {
                tasks.isOwer = false;
    
                // push into list
                this.subscriptions.push(
                   // get users from user service
                  this.userService.getUsers().subscribe((users) => {
      
                    users.obj.forEach((user: UserInterface) => {
                      if(tasks.creator === user._id) {
                        tasks.owner = user.firstname;
                      }
                    });
      
                  })
                )
              }
  
              // TASKS
              this.tasks.push(tasks);
            });
          } 
        }
      }, (error: ErrorEvent) => {
        console.error(error.error.msg)
      })
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(task: TaskInterface) {
    
    const dialogRef = this.dialog.open(DialogComponent, {
      data: task,
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog: ${result}`);
    }); */
  }


  isCompleted(status: string) {
    if(status === 'Completed') {
      return true;
    } else if (status === 'Pending') {
      return false;
    } else {
      return false;
    }
  }

  // get task duration
  taskDuration(task: TaskInterface): string {
    return this.taskService.taskDuration(task);
  }

  // get task days count down
  taskCountdown(task: TaskInterface): string {
    return this.taskService.daysToExpire(task);
  }

  // priority high
  isHighPriority(priority: string) {
    if (priority == 'high') {
      return true;
    }
  }
  // priority normal
  isNormalPriority(priority: string) {
    if (priority == 'normal') {
      return true;
    }
  }
  // priority low
  isLowPriority(priority: string) {
    if (priority == 'low') {
      return true;
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
