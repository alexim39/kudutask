import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {UserService} from '../../../common/user/user.service';
import {UserInterface} from '../../../common/user/user.interface';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AssignService} from './assign.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {ViewService} from '../../team/view/view.service';
import {TeamInterface} from '../../team/team.interface';
import {AssignTaskInterface, RemoveAssigneeInterface} from './assign.interface';

@Component({
  selector: 'kudutask-assign-task',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss', './assign.mobile.scss']
})
export class AssignComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  panelOpenState = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = [];
  allUserEmails: string[] = [];

  user: UserInterface;
  isNotActivatedAccount: boolean;
  assignees: Array<UserInterface> = [];


  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private snackBar: MatSnackBar, 
    private userService: UserService, 
    @Inject(MAT_DIALOG_DATA) public task, 
    private assignTask: AssignService,
    private thisDialogRef: MatDialogRef<AssignComponent>,
    private viewTeams: ViewService
  ) {
    //console.log(task)

    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(''),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allUserEmails.slice())
    );
   }

  ngOnInit(): void {

    // push into sub list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;

        // disable for if user account is not active
        if (this.user.isActive === false) {
          this.isNotActivatedAccount = true;
        }
      })
    );

    // get emails related to user' team
    this.getAllTeamMembersEmail(this.user._id);

    // set already assigned users
    const returnedUsers: UserInterface[] = [];
    if(this.task.assigned.assignees) {
      this.task.assigned.assignees.forEach((user: UserInterface) => {
        returnedUsers.push(user);
      })
      this.assignees = returnedUsers;
    }

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUserEmails.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(description: string) {

    // push into sub list
    this.subscriptions.push(
      // find all users through selected emails
      this.userService.getUserFromEmails(this.emails).subscribe((users: UserInterface[]) => {
        const teamMembersIDs: Array<string> = [];
        // get id of each user
        users.forEach((user: UserInterface) => {
          teamMembersIDs.push(user._id);
        })

        // add the user id of the assigner
        // to be part of the assignee
        //teamMembersIDs.push(this.user._id);

        // form task assign object
        const assignObj: AssignTaskInterface = {
          description: description,
          taskId: this.task._id,
          assignees: teamMembersIDs,
          emails: this.emails
        }

        this.assignTask.assign(assignObj).subscribe((res) => {
          if (res.code === 200) {
    
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
    
            // close dialog
            this.thisDialogRef.close();
    
          } else {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          }
          
        });

      }, (error) => {
        this.snackBar.open(`Team members details could not be obtained`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }

  // get all users on teams created by current user
  private getAllTeamMembersEmail(currentUserId: string) {
    const emails: string[] = [];

    // push into sub list
    this.subscriptions.push(
      this.viewTeams.getAllTeamsWithMember(currentUserId).subscribe((res) => {
        if (res.code === 200) {
  
          res.obj.forEach((team: TeamInterface) => { // for each team get members
            team.members.forEach((member: UserInterface) => {
              emails.push(member.email);
            })
          })
  
        this.allUserEmails= [ ...new Set(emails) ]; // make sure emails are unique
  
        }        
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }




  // remove assignee
  onRemoveAssignee(assigneeId: string, taskId: string) {

    const removeObj: RemoveAssigneeInterface = {
      assigneeId: assigneeId,
      taskId: taskId
    }

    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {

      // push into sub list
      this.subscriptions.push(
        this.assignTask.removeAssignee(removeObj).subscribe((res) => {
          if (res.code === 200) {
    
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
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
      );
    }
    
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }


}
