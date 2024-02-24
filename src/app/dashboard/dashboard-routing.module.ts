import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainComponent } from './main/main.component';
import { ViewComponent as task } from './task/view/view.component';
import { ViewComponent as team } from './team/view/view.component';
import { WindowComponent } from './task/view/window/window.component';
import { TabsComponent } from './team/view/tabs/tabs.component';
import { LandingComponent } from './team/view/landing/landing.component';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './security/password/password.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {DonateComponent} from './donate/donate.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: MainComponent },

      {
        path: 'tasks',
        children: [
          { path: '', component: task },
          { path: ':id', component: WindowComponent },
          //{ path: 'cashout', component: CashoutComponent },
          //{ path: 'cashup', component: CashupComponent },
        ]
      },

      {
        path: 'teams',
        children: [
          {
            path: '', component: team,
            children: [
              { path: '', component: LandingComponent },
              { path: ':id', component: TabsComponent },
            ]
          },
          //{ path: 'cashout', component: CashoutComponent },
          //{ path: 'cashup', component: CashupComponent },
        ]
      },

      { path: 'evaluator', component: EvaluatorComponent },

      { path: 'profile', component: ProfileComponent },

      { path: 'feedback', component: FeedbackComponent },

      { path: 'donate', component: DonateComponent },

      {
        path: 'security',
        children: [
          {
            path: '', component: PasswordComponent,
            children: [
              { path: 'password', component: PasswordComponent },
              //{ path: ':id', component: TeamDetailsComponent },
            ]
          },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }