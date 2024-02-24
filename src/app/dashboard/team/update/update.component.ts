import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TeamInterface} from '../team.interface';
import {UpdateTeamInterface} from './update.interface'
import {UpdateService} from './update.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-update-team',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class EditTeamDetailDialogComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  constructor(
    public thisDialogRef: MatDialogRef<EditTeamDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public team: TeamInterface,
    private updateTeam: UpdateService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onEditTeamSubmit(team: string, description: string): void {
    const updateObj: UpdateTeamInterface = {
      newTeamName: team,
      newDescription: description,
      teamId: this.team._id
    }

    this.subscriptions.push(
      this.updateTeam.update(updateObj).subscribe((res) => {
        if(res.code ===200) {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });
          // close dialog
          this.thisDialogRef.close();
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }

  onCancel(): void {
    this.thisDialogRef.close();
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
