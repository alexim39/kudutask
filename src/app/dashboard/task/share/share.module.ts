import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareComponent } from './share.component';
import {UserModule} from '../../../common/user/user.module';
import {UserService} from '../../../common/user/user.service';
import {MaterialModule} from '../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ShareService} from './share-task.service';

@NgModule({
  declarations: [
    ShareComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ShareComponent
  ],
  providers: [UserService, ShareService]
})
export class ShareModule { }
