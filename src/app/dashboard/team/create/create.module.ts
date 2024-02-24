import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateComponent} from './create.component';
import {MaterialModule} from '../../../common/material/material.module';
import {CreateService} from './create.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateComponent
  ],
  providers: [CreateService]
})
export class CreateModule { }
