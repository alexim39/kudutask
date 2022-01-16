import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TeamInterface} from '../../team.interface';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../../common/user/user.service';
import {UserInterface} from '../../../../common/user/user.interface';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ResponseInterface} from '../../../../common/server/response.interface';
import {AddService} from './add.service';
import {AddMemberInterface} from './add.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-add-member',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {

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
    @Inject(MAT_DIALOG_DATA) public team: TeamInterface,
    public thisDialogRef: MatDialogRef<AddComponent>,
    private userService: UserService, 
    private snackBar: MatSnackBar, 
    private addServ: AddService
  ) { 
    //console.log(team)

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

  onAddMemberSubmit () {

    this.subscriptions.push(
      // find all users through selected emails
      this.userService.getUserFromEmails(this.teamMembersEmails).subscribe((users: UserInterface[]) => {
        const teamMembersId: Array<string> = [];
        // get id of each user
        users.forEach((user) => {
          teamMembersId.push(user._id);
        })


        // check and remove duplicates of user ids
        const uniqIds = [...new Set(teamMembersId)];

        const membersObj: AddMemberInterface = {
          creator: this.user._id,
          teamMembersID: uniqIds,
          teamId: this.team._id
        };

        this.addServ.add(membersObj).subscribe((res: ResponseInterface) => {
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
            panelClass: ['success']
          });
        });

      }, (error) => {
        this.snackBar.open(`Team members details could not be obtained`, `Close`, {
          duration: 4000,
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
