import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountStatusPipe } from './account-status/account-status.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import {SentenceCasePipe} from './sentence-case/sentence-case.pipe';


@NgModule({
  declarations: [
    AccountStatusPipe,
    TruncatePipe,
    SentenceCasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AccountStatusPipe,
    TruncatePipe,
    SentenceCasePipe
  ]
})
export class PipesModule { }
