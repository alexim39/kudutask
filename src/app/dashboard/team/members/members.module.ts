import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddService} from './add/add.service';
import {MaterialModule} from '../../../common/material/material.module';
import {AddComponent} from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddComponent
  ],
  providers: [AddService]
})
export class MembersModule { }