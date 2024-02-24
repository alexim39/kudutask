import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {TeamInterface} from '../../team.interface';
import {UserService} from '../../../../common/user/user.service';
import {ViewService} from '../view.service'
import {UserInterface} from '../../../../common/user/user.interface'
import {TabsService} from './tabs.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AddComponent} from '../../members/add/add.component'
import {EditTeamDetailDialogComponent} from '../../update/update.component';


@Component({
  selector: 'kudutask-team-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss', './tabs.mobile.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  
  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  teams: Array<TeamInterface> = [];
  team: TeamInterface;
  isEmptyResponse: boolean;
  members: UserInterface[] = [];  
  isCreator: boolean = false;
  currentUser: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private viewTeams: ViewService,
    private tabsService: TabsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // get current user details from data service
    this.subscriptions.push(
        this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    this.subscriptions.push(
      this.viewTeams.getAllTeamsWithMember(this.user._id).subscribe((res) => {
        if (res.code === 200) {

          // check for empty
          if(res.obj.length == 0) {
            this.isEmptyResponse = true;
          } else {
            
            this.teams = res.obj;

            // loop through teams to find the creator
            this.teams.forEach((team: TeamInterface) => {
              if (team.creator === this.user._id) {
                this.isCreator = true;
              } else {
                this.isCreator = false;

                this.subscriptions.push(
                  // get users from user service
                  this.userService.getUsers().subscribe((users) => {
                    users.obj.forEach((currentUser: UserInterface) => {
                      if (this.user._id === currentUser._id) {
                        this.currentUser = currentUser._id;
                      }
                      /* if (team.creator === currentUser._id) {
                        this.teamOwner = currentUser._id;
                      } */
                    });
                  })
                )
              }
            })

            this.subscriptions.push(
              // get team id from route and loop throught to fetch specific team
              this.activatedRoute.params.subscribe(params => {
                const teamId: string = params['id'];
                // loop through array to find a match for id
                this.teams.filter((team: TeamInterface) => {
                  if (team._id == teamId) {
                    this.team =  team;
                    //console.log(this.team)
                    this.members = this.team.members;
                    //console.log(this.members)
                  }
                })
              })
            )
          }
        }
      })
    )
  }

  openAddTeamMemberDialog(team: TeamInterface) {
    /* Task dialog reference */
    const taskDialogRef = this.dialog.open(AddComponent, {data: team});
    taskDialogRef.afterClosed().subscribe(result => {
      // callback when dialog is closed
      //console.log(`Dialog result: ${result}`);
    });
  }

  removeMember(memberId: string, teamId: string) {
    // check if its task ower id
    if (memberId === this.user._id) {
      this.snackBar.open(`Sorry, you can't be removed yet. You are currently team owner`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
    } else {
      const confirmDelete = confirm("Are you sure you want to remove memeber from team?");
      if (confirmDelete) {

        this.subscriptions.push(
          this.tabsService.deleteTeamMember(memberId, teamId).subscribe((res)=> {

            if(res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 8000,
                panelClass: ['success']
              });
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
  }

  deleteTeam(team: TeamInterface){
    const confirmDelete = confirm("Are you sure you want to delete this team?");
    if (confirmDelete) {
      this.subscriptions.push(
        this.tabsService.deleteTeam(team._id).subscribe((res)=> {

          if(res.code ===200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 8000,
              panelClass: ['success']
            });
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

  openEditTeamDetailDialog(team: TeamInterface): void {
    const editTeamDetailDialogRef = this.dialog.open(EditTeamDetailDialogComponent, { data: team });

    /* editTeamDetailDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    }); */
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
