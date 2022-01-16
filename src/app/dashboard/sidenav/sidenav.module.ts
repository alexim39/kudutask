import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import {UserModule} from '../../common/user/user.module';
import {UserService} from '../../common/user/user.service';
import {MaterialModule} from '../../common/material/material.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    SidenavComponent

  ],
  imports: [
    CommonModule,
    UserModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    SidenavComponent

  ],
  providers: [UserService]
})
export class SidenavModule { }
