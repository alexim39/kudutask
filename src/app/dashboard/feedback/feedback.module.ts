import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedbackComponent } from './feedback.component';
import {MaterialModule} from './../../common/material/material.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PipesModule} from './../../common/pipes/pipes.module';
import {FeedbackService} from './feedback.service';



@NgModule({
  declarations: [FeedbackComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [FeedbackComponent],
  providers: [FeedbackService]
})
export class FeedbackModule { }
