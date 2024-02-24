import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { ViewService } from './view/view.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './../../common/material/material.module';
import { LandingComponent } from './view/landing/landing.component';
import { PipesModule } from './../../common/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateModule } from './create/create.module'
import { TeamService } from './team.service';
import { UpdateModule } from './update/update.module'
import { TabsModule } from './view/tabs/tabs.module';
import { MembersModule } from './members/members.module';


@NgModule({
  declarations: [ ViewComponent, LandingComponent],
  imports: [
    CommonModule,
    CreateModule,
    MaterialModule,
    PipesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UpdateModule,
    TabsModule,
    MembersModule
  ],
  exports: [ ViewComponent, LandingComponent],
  providers: [TeamService, ViewService]
})
export class TeamModule { }
