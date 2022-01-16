import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../../common/user/user.interface';
import { UserService } from '../../../common/user/user.service';
import { ViewService } from './view.service'
import { TeamInterface } from '../team.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-view-teams',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss', './view.mobile..scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  teams: Array<TeamInterface> = [];
  isEmptyResponse: boolean;
  isCreator: boolean = false;
  //creator: UserInterface;

  constructor(
    private userService: UserService,
    private viewService: ViewService,
    private route: Router
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
      })
    )

    // push into list
    this.subscriptions.push(
      this.viewService.getTeams(this.user._id).subscribe((res) => {
        if (res.code === 200) {

          // check for empty
          if (res.obj.length == 0) {
            this.isEmptyResponse = true;
          } else {

            this.teams = res.obj;

            // loop through teams to find the creator
            this.teams.forEach((team: TeamInterface) => {
              if (team.creator === this.user._id) {
                this.isCreator = true;
                team.owner = 'You';

              } else {
                this.isCreator = false;

                // push into list
                this.subscriptions.push(
                  // get users from user service
                  this.userService.getUsers().subscribe((users) => {

                    users.obj.forEach((user: UserInterface) => {
                      if (team.creator === user._id) {
                        team.owner = user.firstname + ' ' + user.lastname;
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

  goToTeam(id: string) {
    this.route.navigateByUrl(`/dashboard/teams/${id}`);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
