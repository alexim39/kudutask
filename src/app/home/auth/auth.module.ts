import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { NavModule } from './../nav/nav.module';
import { FooterModule } from './../footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from './sign-up/sign-up.service';
import { SignInService } from './sign-in/sign-in.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';
import { ActivationComponent } from './activation/activation.component';
import { ActivationService } from './activation/activation.service';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewPasswordService } from './new-password/new-password.service';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ForgotPasswordComponent, ActivationComponent, NewPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavModule,
    FooterModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SignInComponent, SignUpComponent, ForgotPasswordComponent, ActivationComponent, NewPasswordComponent],
  providers: [SignUpService, SignInService, ForgotPasswordService, ActivationService, NewPasswordService]
})
export class AuthModule { }
