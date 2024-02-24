import { Component, OnInit } from '@angular/core';
import {UserService} from './../../common/user/user.service';
import {UserInterface} from './../../common/user/user.interface';
import {ResponseInterface} from './../../common/server/response.interface';

@Component({
  selector: 'kudutask-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  // notifications
  notifications: number = 1;

  user: UserInterface;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
     // get current user details from data service
     this.userService.getUser.subscribe((user) => {
      this.user = user;
    });
  }

}
