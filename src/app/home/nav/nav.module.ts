import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { NavComponent } from './nav.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavComponent,
  ],
})
export class NavModule { }