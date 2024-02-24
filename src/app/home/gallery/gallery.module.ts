import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import {MaterialModule} from './../../common/material/material.module';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GalleryComponent
  ],
  providers: []
})
export class GalleryModule { }
