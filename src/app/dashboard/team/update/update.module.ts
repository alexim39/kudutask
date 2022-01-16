import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTeamDetailDialogComponent } from './update.component';
import {MaterialModule} from '../../../common/material/material.module';
import {UpdateService} from './update.service';


@NgModule({
  declarations: [
    EditTeamDetailDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    EditTeamDetailDialogComponent
  ],
  providers: [UpdateService]
})
export class UpdateModule { }
