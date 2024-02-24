import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserModule} from '../../../common/user/user.module';
import {UserService} from '../../../common/user/user.service';
import {MaterialModule} from '../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ViewComponent} from './view.component';
import {ViewService} from './view.service';
import {RouterModule} from '@angular/router';
import {DialogModule} from './dialog/dialog.module';
import {WindowModule} from './window/window.module';

@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    DialogModule,
    WindowModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ViewComponent,
  ],
  providers: [UserService, ViewService],
})
export class ViewModule { }
