import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateComponent as task} from '../task/create/create.component';
import {CreateComponent as team} from '../team/create/create.component';
// declare jquery as any
declare const $: any;
import { Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-sidenav-list',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  constructor(private route: Router, public dialog: MatDialog) {  }

  ngOnInit(): void {
    // init list togle
    this.listItemTogle();
  }

  openNewTaskDialog() {

    /* Task dialog reference to create new task */
    const taskDialogRef = this.dialog.open(task);

    // push into sub list
    this.subscriptions.push(
      taskDialogRef.afterClosed().subscribe(result => {
        // callback when dialog is closed
        //console.log(`Dialog result: ${result}`);
      })
    );

  }

  openNewTeamDialog() {

    /* Team dialog reference */
    const teamDialogRef = this.dialog.open(team);

    // push into sub list
    this.subscriptions.push(
      teamDialogRef.afterClosed().subscribe(result => {
        // callback when dialog is closed
        //console.log(`Dialog result: ${result}`);
      })
    );

  }


  private listItemTogle() {
    
    // Toggle tasks indicator
    $('.task-close').show();
    $('.task').click(() => {
     if ($('.task-close').is(':visible')) {
       $('.task-close').hide(300);
       $('.task-open').show(300);
       $('.forTask').show(100);
     } else {
       $('.task-close').show(300);
       $('.task-open').hide(300);
       $('.forTask').hide(100);
     }
    });

    // Toggle team indicator
    $('.team-close').show();
    $('.team').click(() => {
     if ($('.team-close').is(':visible')) {
       $('.team-close').hide(300);
       $('.team-open').show(300);
       $('.forTeam').show(100);
     } else {
       $('.team-close').show(300);
       $('.team-open').hide(300);
       $('.forTeam').hide(100);
     }
    });

    // Toggle task manager indicator
    $('.tm-close').show();
    $('.tm').click(() => {
     if ($('.tm-close').is(':visible')) {
       $('.tm-close').hide(300);
       $('.tm-open').show(300);
       $('.forTM').show(100);
     } else {
       $('.tm-close').show(300);
       $('.tm-open').hide(300);
       $('.forTM').hide(100);
     }
    });

  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }


}
