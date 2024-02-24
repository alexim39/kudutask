import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../common/user/user.service';
import {UserInterface} from './../../common/user/user.interface';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {CreateComponent} from './../task/create/create.component';
import {MainService} from './main.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  isActive: boolean;

  constructor(
    private userService: UserService, 
    public dialog: MatDialog, 
    private mainService: MainService) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
        this.isActive = this.user.isActive;
      })
    )
    
  }

  openNewTaskDialog() {

    /* Task dialog reference create new task */
    const taskDialogRef = this.dialog.open(CreateComponent);
    taskDialogRef.afterClosed().subscribe(result => {
      // callback when dialog is closed
      //console.log(`Dialog result: ${result}`);
    });

  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}


