import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserModule} from '../../../common/user/user.module';
import {UserService} from '../../../common/user/user.service';
import {MaterialModule} from '../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ViewService} from '../view/view.service';
import { AssignComponent } from './assign.component';
import {AssignService} from './assign.service';
import {PipesModule} from '../../../common/pipes/pipes.module';


@NgModule({
  declarations: [
    AssignComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AssignComponent,
  ],
  providers: [UserService, ViewService, AssignService],
})
export class AssignModule { }
