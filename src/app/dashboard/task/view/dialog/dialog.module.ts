import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service'
import { DialogComponent } from './dialog.component';
import { MaterialModule } from '../../../../common/material/material.module';
import { UserModule } from '../../../../common/user/user.module';
import { UserService } from '../../../../common/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { ControlModule } from './../window/assigner/controls/control.module';


@NgModule({
  declarations: [
    DialogComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    UserModule,
    ControlModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    DialogComponent,
    UpdateComponent
  ],
  providers: [DialogService, UserService]
})
export class DialogModule { }
