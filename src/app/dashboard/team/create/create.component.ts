import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {UserService} from '../../../common/user/user.service';
import {UserInterface} from '../../../common/user/user.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {CreateService} from './create.service';
import {CreateInterface} from './create.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {ResponseInterface} from '../../../common/server/response.interface';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'kudutask-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss', './create.mobile.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  teamMembersEmails: string[] = [];
  allUserEmails: Array<string> = [];

  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  user: UserInterface;
  isNotActivatedAccount: boolean;

  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar, 
    private team: CreateService, 
    public thisDialogRef: MatDialogRef<CreateComponent>) {

    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(''),
      map((email: string | null) => email ? this.filter(email) : this.allUserEmails.slice())
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.teamMembersEmails.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.emailCtrl.setValue(null);
  }

  remove(email: string): void {
    const index = this.teamMembersEmails.indexOf(email);

    if (index >= 0) {
      this.teamMembersEmails.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.teamMembersEmails.push(event.option.viewValue);
    this.emailInput.nativeElement.value = '';
    this.emailCtrl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allUserEmails.filter(email => email.toLowerCase().indexOf(filterValue) === 0);
  }
  
  onNewTeamSubmit(name: string, description: string) {

    const teamObj: CreateInterface = {
      name: name,
      description: description
    }

    this.subscriptions.push(
      // find all users through selected emails
      this.userService.getUserFromEmails(this.teamMembersEmails).subscribe((users: UserInterface[]) => {
        const teamMembersId: Array<string> = [];
        // get id of each user
        users.forEach((user) => {
          teamMembersId.push(user._id);
        })

        // add the user id of the creator
        // to be part of the team
        teamMembersId.push(this.user._id);

        // check and remove duplicates of user ids
        const uniqIds = [...new Set(teamMembersId)];

        teamObj['creator'] = this.user._id;
        teamObj['members'] = uniqIds;
        //teamObj['name'] = name;
        //teamObj['description'] = description;

        this.subscriptions.push(
          this.team.create(teamObj).subscribe((res: ResponseInterface) => {

            if (res.code === 200) {
      
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 8000,
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
      
          })
        )

      }, (error) => {
        this.snackBar.open(`Team members details could not be obtained`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.userService.getUser.subscribe((user) => {
        this.user = user;

        // disable for if user account is not active
        if (this.user.isActive === false) {
          this.isNotActivatedAccount = true;
        }

      })
    )



    this.subscriptions.push(
      // used to get all users email
      this.userService.getUsers().subscribe((res: ResponseInterface) => {
        let uniqEmails: string[] = [];

        if (res.code === 200) {
          res.obj.forEach((user: UserInterface) => {
            
            uniqEmails.push(user.email);
          });

          // set email
          this.allUserEmails = [...new Set(uniqEmails)]; //var uniq = [ ...new Set(names) ]; // remove duplicates

          return res;
        }
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

