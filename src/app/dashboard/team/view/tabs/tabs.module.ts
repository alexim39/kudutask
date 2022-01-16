import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../../../common/material/material.module';
import { TabsComponent } from './tabs.component';
import {TabsService} from './tabs.service';
import {PipesModule} from '../../../../common/pipes/pipes.module';
import {SharedTasksComponent } from './../shared-tasks/shared-tasks.component';
import { WorkloadsComponent } from './workloads/workloads.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    TabsComponent,
    SharedTasksComponent,
    WorkloadsComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  exports: [
    TabsComponent
  ],
  providers: [TabsService]
})
export class TabsModule { }