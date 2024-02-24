import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluatorComponent } from './evaluator.component';



@NgModule({
  declarations: [
    EvaluatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EvaluatorComponent
  ],
  providers: []
})
export class EvaluatorModule { }
