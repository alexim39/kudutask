import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewService } from './../../view.service';
import {UserInterface} from '../../../../../common/user/user.interface'
import {UserService} from '../../../../../common/user/user.service';
import { TeamInterface } from '../../../team.interface';

@Component({
  selector: 'kudutask-workloads',
  templateUrl: './workloads.component.html',
  styleUrls: ['./workloads.component.scss']
})
export class WorkloadsComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() member: UserInterface;
  @Input() team: TeamInterface;
  user: UserInterface;
  isCreator: boolean = false;
  currentUser: string;
  isEmptyResponse: boolean;
  teams: Array<TeamInterface> = [];

  constructor(
    private userService: UserService,
    private viewTeams: ViewService,
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
                    });
                  })
                )
              }
            })            
          }
        }
      })
    )
  }

  viewWorkload (memberId: string, teamId: string) {
    console.log(memberId);
    console.info(teamId)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
