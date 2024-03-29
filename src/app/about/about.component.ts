import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private titleService:Title) { 
    this.titleService.setTitle('About');
  }

  ngOnInit(): void {
    localStorage.setItem('interval', '2');
  }

  onIntervalChanged(interval) {
    localStorage.setItem('interval', interval);
    console.log('The interval has been set to ' + interval + ' seconds.')
  }

}
