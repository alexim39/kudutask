import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseInterface } from './../../common/server/response.interface';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ContactInterface } from './contact';
import { Subscription } from 'rxjs';
import { ContactService } from './constact.service'
import { FormsManager } from 'src/app/common/service/forms-manager.service';

@Component({
  selector: 'kudutask-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', './contact.mobile.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  // init subscriptions list
  subscriptions: Subscription[] = [];

  contactForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService,
    private formsManager: FormsManager
  ) { }

  ngOnInit(): void {

    this.contactForm = new FormGroup({
      names: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100)
          ], updateOn: 'change'
      }),

      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),

      phone: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.maxLength(11),
            Validators.minLength(11)
          ], updateOn: 'change'
      }),

      coments: new FormControl('', {
        validators:
          [
            Validators.required,
            this.comentValidator,
          ], updateOn: 'change'
      }),

    })

  }

  private comentValidator(control: AbstractControl) {
    if (control.value.length > 350) {
      return { 'comentValidator': true }
    }
  }

  onSubmit(contactObj: ContactInterface) {
    // push into list
    this.subscriptions.push(
      this.contactService.submit(contactObj).subscribe((response: ResponseInterface) => {

        if (response.code === 200) {
          this.snackBar.open(`${response.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          // reset form
          this.formsManager.resetForm(this.contactForm);
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
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
