import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../../../../common/user/user.module';
import { UserService } from '../../../../common/user/user.service';
import { MaterialModule } from '../../../../common/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WindowComponent } from './window.component';
import { RouterModule } from '@angular/router';
import { WindowService } from './window.service';
import { StatusCardsComponent } from './status-cards/status-cards.component';
import { AssignerService } from './assigner/assigner.service';
import { AssigneeService } from './assignee/assignee.service';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { AssigneeComponent } from './assignee/assignee.component';
import { AssignerComponent } from './assigner/assigner.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { TaskProgressComponent } from './assignee/task-progress/task-progress.component';
import { AssigneesComponent } from './assigner/assignees/assignees.component';
import { SummaryComponent } from './summary/summary.component';
import { AssigneesService } from './assigner/assignees/assignees.service';
import { TimelineComponent } from './status-cards/timeline/timeline.component';
import { ControlModule } from './assigner/controls/control.module';

@NgModule({
  declarations: [
    WindowComponent, AssignerComponent, AssigneeComponent, StatusCardsComponent,
    ChatComponent, TaskProgressComponent, AssigneesComponent, SummaryComponent, TimelineComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    FormsModule,
    PipesModule,
    ControlModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    WindowComponent, AssignerComponent, AssigneeComponent, StatusCardsComponent,
    ChatComponent, TaskProgressComponent,
  ],
  providers: [UserService, WindowService, AssignerService, AssigneeService, ChatService, AssigneesService]
})
export class WindowModule { }
