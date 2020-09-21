import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('interval', '2');
  }

  onIntervalChanged(interval) {
    localStorage.setItem('interval', interval);
    console.log('The interval has been set to ' + interval + ' seconds.')
  }

}
