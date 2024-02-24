import { ControlsComponent } from './controls.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {ControlsService} from './controls.service';

@NgModule({
  declarations: [
    ControlsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    ControlsComponent
  ],
  providers: [ControlsService]
})
export class ControlModule { }
