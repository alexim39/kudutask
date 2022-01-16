import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate.component';
import { MaterialModule } from './../../common/material/material.module';
import { CardComponent } from './card/card.component';
import { PaypalComponent } from './paypal/paypal.component';
import { SkrillComponent } from './skrill/skrill.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DonateComponent,
    CardComponent,
    PaypalComponent,
    SkrillComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    //DonateComponent
  ],
  providers: []
})
export class DonateModule { }