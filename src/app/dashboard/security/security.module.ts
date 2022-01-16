import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordModule} from './password/password.module'


@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    PasswordModule
  ],
  exports: [],
  providers: []
})
export class SecurityModule { }
