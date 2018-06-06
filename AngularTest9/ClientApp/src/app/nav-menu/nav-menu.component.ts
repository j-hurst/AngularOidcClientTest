import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;


  constructor(private authService: AuthService, private http: HttpClient) {

  }


  collapse() {
    this.isExpanded = false;
    this.http.get(`${window.location.origin}/api/SampleData`).subscribe(data => {
      console.log(data as string);
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.authService.startAuthentication();
  }
}
