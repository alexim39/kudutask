import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kudutask-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './footer.mobile.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();


  constructor() { }

  ngOnInit(): void {  }

}
