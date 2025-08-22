import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navbar',
  imports:[],
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {
  currentRouteName = '';

  constructor(private router: Router) {
    router.events.subscribe(() => {
      const path = router.url.split('/')[1];
      this.currentRouteName = path.charAt(0).toUpperCase() + path.slice(1);
    });
  }
}


