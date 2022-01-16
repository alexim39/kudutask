import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
              <kudutask-nav></kudutask-nav>
                <router-outlet></router-outlet>
              <kudutask-footer></kudutask-footer>
            `
})
export class HomeComponent implements OnInit{
  
    constructor() { }

  ngOnInit(): void {
  }
  
}
