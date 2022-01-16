import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../common/material/material.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {HomeRoutingModule} from './home-routing.module';
import {AuthModule} from './auth/auth.module';
import {NavModule} from './nav/nav.module';
import {FooterModule} from './footer/footer.module';
import {GalleryModule} from './gallery/gallery.module';
import { ContactComponent } from './contact/contact.component';
import {LegalComponent} from './legal/legal.component';
import { CookiesComponent } from './legal/cookies/cookies.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { TermsComponent } from './legal/terms/terms.component';
import { DonateComponent } from './donate/donate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home.component';
import { CardComponent } from './donate/card/card.component';
import { SkrillComponent } from './donate/skrill/skrill.component';
import { PaypalComponent } from './donate/paypal/paypal.component';
import { FeatureComponent } from './feature/feature.component';
import {ContactService} from './contact/constact.service';


@NgModule({
  declarations: [
    HomeComponent,
    LandingPageComponent,
    ContactComponent,
    LegalComponent,
    TermsComponent,
    CookiesComponent,
    PrivacyComponent,
    DonateComponent,
    CardComponent,
    SkrillComponent,
    PaypalComponent,
    FeatureComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthModule,
    NavModule,
    FooterModule,
    GalleryModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeComponent,
    LandingPageComponent,
    ContactComponent,
    LegalComponent,
    TermsComponent,
    CookiesComponent,
    PrivacyComponent,
    DonateComponent,
    CardComponent,
    SkrillComponent,
    PaypalComponent
  ],
  providers: [ContactService]
})
export class HomeModule { }
