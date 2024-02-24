import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {MaterialModule} from './../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileService} from './profile.service';
import {PipesModule} from './../../common/pipes/pipes.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule
    
  ],
  exports: [ProfileComponent],
  providers: [ProfileService]
})
export class ProfileModule { }
