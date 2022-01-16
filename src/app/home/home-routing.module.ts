import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import { TermsComponent } from './legal/terms/terms.component';
import {LegalComponent} from './legal/legal.component';
import { CookiesComponent } from './legal/cookies/cookies.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import {ContactComponent} from './contact/contact.component';
import {DonateComponent} from './donate/donate.component';
import {HomeComponent} from  './home.component';
import {CardComponent} from './donate/card/card.component';
import { PaypalComponent } from './donate/paypal/paypal.component';
import { SkrillComponent } from './donate/skrill/skrill.component';
import {ActivationComponent} from './auth/activation/activation.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';



const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: LandingPageComponent  },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'signup/:userId', component: ActivationComponent },
      { path: 'new-password/:userId', component: NewPasswordComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'legal',
        children: [
          { path: '', component: LegalComponent,
            children: [
              { path: '', component: TermsComponent },
              { path: 'terms', component: TermsComponent },
              { path: 'privacy', component: PrivacyComponent },
              { path: 'cookies', component: CookiesComponent },
            ]
          },
        ]
      },
      { path: 'donate',
        children: [
          { path: '', component: DonateComponent,
            children: [
              { path: '', component: CardComponent },
              { path: 'card', component: CardComponent },
              { path: 'paypal', component: PaypalComponent },
              { path: 'skrill', component: SkrillComponent },
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
export class HomeRoutingModule { }
