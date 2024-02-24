import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from './../home/auth/auth.service';
import { Router } from '@angular/router';
import {DashboardService} from './dashboard.service';
import {UserService} from './../common/user/user.service';
import {UserInterface} from './../common/user/user.interface';
import {ResponseInterface} from './../common/server/response.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kudutask-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];

  currentUser: UserInterface;
  imagePath: string = `./../../../assets/img/spp.png`;

  /* isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe( map(result => result.matches), shareReplay() ); */

  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private authService: AuthService, 
    private router: Router, 
    private dashboardService: DashboardService,
    private UserService: UserService) {
      this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    }

  private getUser() {

    // push into list
    this.subscriptions.push(
      this.dashboardService.getUser().subscribe((res) =>{
        if(res.code === 200) {
          this.currentUser = res.obj;
          //console.log(this.currentUser)

          // set user details on shared data service
          // to enable the use of user details on other components
          this.UserService.setUser(res.obj);

        }
      }, (error) => {
        console.error(error);
        // reroute to home page
        this.router.navigate(['/']);
      })
    )
  }

  signOut(): void {
    this.authService.signOut().subscribe((res: ResponseInterface) => {
      if (res.code === 200) {
        localStorage.removeItem('token')
        // reroute to home page
        this.router.navigate(['/']);
      }
    }, (error) => {
      console.error(error);
    })
  }

  ngOnInit(): void {
    // load user details
    this.getUser();
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
