import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {NotificationService} from './notification.service';
import {MaterialModule} from './../../common/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule { }
