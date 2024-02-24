import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import {PasswordService} from './password.service'
import {MaterialModule} from './../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PipesModule} from './../../../common/pipes/pipes.module';

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  /* entryComponents: [
    PasswordComponent
  ], */
  providers: [PasswordService]
})
export class PasswordModule { }
