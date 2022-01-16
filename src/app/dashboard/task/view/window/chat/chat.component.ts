import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import {TaskInterface} from '../../../task.interface';
import {UserInterface} from '../../../../../common/user/user.interface';
import {UserService} from '../../../../../common/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import {ChatService} from './chat.service';
import {TaskService} from '../../../task.service';
import {AssignTaskInterface} from '../../../assign/assign.interface';
import {ChatInterface} from './chat.interface';
// declare jquery as any
declare const $: any;



@Component({
  selector: 'kudutask-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', './chat.mobile.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy  {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  @Input()
  task: TaskInterface;
  assignedTask: AssignTaskInterface;
  assignees: Array<string> = [];


  // chat msg
  msg: string;

  taskMessages: ChatInterface[] = [];

  constructor(
    private taskService: TaskService,
    private chat: ChatService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }


  openForm() {
    $('.chat').show();
  }

  closeForm(){
    $('.chat').hide();
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
      // get task assigness
      this.taskService.getTask(this.task._id).subscribe((res) => {

        if (res.code === 200) {
          this.task = res.obj;
          this.assignedTask = this.task.assigned;

          // get assigness
          this.assignedTask.assignees.forEach((user: string) => { // NOTE: Check interface letter to anable correction of user type to UserInterface from string type
            this.assignees.push(user);
          })
        }

      })
    )

  }


  private getMessages() {

    // push into list
    this.subscriptions.push(
      // get user task acknolegement if available
      this.chat.getChatMsg(this.user._id, this.task._id).subscribe((res) => {
        if (res.code === 200) {
          const rMsg: ChatInterface[] = [];

          const sorted: ChatInterface[] = res.obj.sort((a: ChatInterface, b: ChatInterface) => {
            const c: number = new Date(a.sentTime).getTime();
            const d: number = new Date(b.sentTime).getTime();
            return c - d ;
          })

          sorted.forEach((msg: ChatInterface) => {

            // check the task owner
            if (this.user._id === msg.user) {
              msg.owner = 'You';
            } else {

              // push into list
              this.subscriptions.push(
                // get task owner from user service
                this.userService.getUsers().subscribe((users) => {

                  users.obj.forEach((user: UserInterface) => {
                    if(msg.user === user._id) {
                      msg.owner = user.firstname + ' ' + user.lastname;
                    }
                  });

                })
              )
            }
            rMsg.push(msg)
          })
          this.taskMessages = rMsg; 
          
        }
      })
    )

  }


  // check message owner
  isOwner(msg: ChatInterface) {
    if (msg.owner === 'You') {
      return true;
    } else {
      return false;
    }
  }


  
  onMsgSubmit(chatMsg: string) {
    const msgObj: any = {
      chatMsg: chatMsg,
      userId: this.user._id,
      taskId: this.task._id
    }

    // push into list
    this.subscriptions.push(
      this.chat.sendChatMsg(msgObj).subscribe((res) =>{
        if (res.code === 200) {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

        } else {

          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });

        }
      })
    )
  }


  ngAfterViewInit() {
    this.getMessages();
  }


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }


}
