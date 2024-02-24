import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { FooterComponent } from './footer.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
  ],
})
export class FooterModule { }