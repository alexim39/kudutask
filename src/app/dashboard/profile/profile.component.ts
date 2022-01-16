import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from './../../common/user/user.service';
import {UserInterface} from './../../common/user/user.interface';
import {ProfileInterface} from './profile.interface';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import {ProfileService} from './profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'kudutask-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', './profile.mobile.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  profileForm: FormGroup;

  imagePath: string = `./../../../assets/img/spp.png`;
  user: UserInterface;
  isActive: boolean;


  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    private route: Router,
    private profile: ProfileService
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser.subscribe((user) => {
        this.user = user;
        this.isActive = this.user.isActive;

        this.profileForm = new FormGroup({
          firstname: new FormControl(user.firstname, {validators: 
            [
              Validators.required,
              Validators.pattern('[A-Za-z]{2,80}')
            ], updateOn: 'change'
          }),
          lastname: new FormControl(user.lastname, {validators: 
            [
              Validators.required,
              Validators.pattern('[A-Za-z]{2,80}'),
              //this.ageValidator
            ], updateOn: 'change'
          }),
          jobTitle: new FormControl(user.jobTitle, {validators: 
            [
              Validators.required,
              //Validators.pattern('[A-Za-z]{2,50}'),
              //this.ageValidator
            ], updateOn: 'change'
          }),
          organization: new FormControl(user.organization, {validators: 
            [
              Validators.required,
              //Validators.pattern('[A-Za-z]{2,100}'),
              //this.ageValidator
            ], updateOn: 'change'
          }),
          email: new FormControl(user.email.toLowerCase(), {validators: 
            [
              Validators.required, 
              Validators.email
            ], updateOn: 'change' 
          }),
          phone: new FormControl(user.phone, {validators: 
            [
              Validators.required, 
              Validators.minLength(11),
              Validators.maxLength(11),
              //Validators.pattern('[0-9]{1,11}'),
            ], updateOn: 'change' 
          }),
          about: new FormControl(user.about, {validators: 
            [
              //Validators.required,
              //Validators.pattern('[A-Za-z]{2,50}'),
              Validators.maxLength(80),
            ], updateOn: 'change'
          }),
        })

      })
    )
  }

  onSubmit(profile: ProfileInterface) {
    
    // add user id
    profile['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(
      
      this.profile.update(profile).subscribe((res) => {
        if(res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        } 
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )

  }

  // delete profile
  deleteProfile() {
    const confirmDelete = confirm(`You are about to permanently delete your profile from Kudutask, by continuing you will loss access to your profile and all information you have in Kudutask`);
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.profile.delete(this.user._id).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            // sign user out
            setTimeout(() => { 
              // redirect user to task list
              this.route.navigateByUrl(`/`);
            }, 4000);
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )
    }    
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
