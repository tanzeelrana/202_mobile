import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
  selector: 'filter-popover',
  templateUrl: 'filterPopover.html',
})
export  class PopoverPage {
  
  filters = {};
  
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
  ) {
    this.filters= navParams.data.filters;
    console.log(this.filters)
  }
    close() {
      this.viewCtrl.dismiss(this.filters);
    }
  }