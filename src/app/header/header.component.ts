import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'src/models/menuItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[];

  private readonly aboutMenuItem: MenuItem = {
    name: 'About',
    route: '/about'
  }
  private readonly learnMenuItem: MenuItem = {
    name: 'Learn',
    route: '/learn'
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuItems = [this.aboutMenuItem, this.learnMenuItem];
  }

}
