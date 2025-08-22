import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[ RouterOutlet],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
