import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewModule} from './view/view.module';
import {AssignModule} from './assign/assign.module';
import {ShareModule} from './share/share.module';
import {CreateModule} from './create/create.module';
import {TaskService} from './task.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateModule,
    ViewModule,
    AssignModule,
    ShareModule
  ],
  exports: [
    
  ],
  providers: [TaskService]
})
export class TaskModule { }
