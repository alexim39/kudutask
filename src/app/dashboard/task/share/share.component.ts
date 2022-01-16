import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from '../../../common/user/user.service';
import { UserInterface } from '../../../common/user/user.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewService } from '../../team/view/view.service';
import { TeamInterface } from '../../team/team.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShareService } from './share-task.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-share-task',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss', './share.mobile.scss']
})
export class ShareComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  user: UserInterface;
  teams: Array<TeamInterface>;

  public teamsToShareTaskWith: Array<string> = [];

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public task,
    private viewTeams: ViewService,
    private shareTask: ShareService,
    private thisDialogRef: MatDialogRef<ShareComponent>) {
    //console.log(task)
  }

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
      // get teams created by user
      this.viewTeams.getTeams(this.user._id).subscribe((res) => {
        if (res.code === 200) {
          this.teams = res.obj;
        }
      })
    );

  }

  addTeam(id: string) {
    // add teams id to array
    this.teamsToShareTaskWith.push(id);
  }

  onShare(taskId: string) {
    const shareObj = {
      taskId: taskId,
      teamsToShareTaskWith: this.teamsToShareTaskWith,
      creator: this.user._id
    }

    // push into list
    this.subscriptions.push(
      this.shareTask.share(shareObj).subscribe((res) => {
        if (res.code === 200) {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });

          // close dialog
          this.thisDialogRef.close();
          // clear share object teams id
          delete shareObj.teamsToShareTaskWith;

        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
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
