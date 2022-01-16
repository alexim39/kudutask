import { Component, OnInit } from '@angular/core';
// declare jquery as any
declare const $: any;

@Component({
  selector: 'kudutask-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss', './gallery.mobile.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $('.horizon-prev').click(function(event) {
      event.preventDefault();
      $('.container').animate({
        scrollLeft: "-=775px"
      }, "slow");
    });
    
     $('.horizon-next').click(function(event) {
      event.preventDefault();
      $('.container').animate({
       scrollLeft: "+=775px"
      }, "slow");
    });

  }
  

}