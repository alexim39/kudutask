import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from './../common/material/material.module';
import { AuthService } from './../home/auth/auth.service';
import { SignInService } from './../home/auth/sign-in/sign-in.service';
import { UserModule } from './../common/user/user.module';
import { UserService } from './../common/user/user.service';
import { MainModule } from './main/main.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { RouterModule } from '@angular/router';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { EvaluatorModule } from './evaluator/evaluator.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { SecurityModule } from './security/security.module';
import { FeedbackModule } from './feedback/feedback.module';
import { DonateModule } from './donate/donate.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    MainModule,
    SidenavModule,
    RouterModule,
    EvaluatorModule,
    TeamModule,
    TaskModule,
    ProfileModule,
    SecurityModule,
    NotificationModule,
    DonateModule,
    FeedbackModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent,
  ],
  providers: [AuthService, SignInService, DashboardService, UserService]
})
export class DashboardModule { }
