import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    console.log('complete auth');
    this.authService.onConfigurationLoaded.subscribe(() => {
      this.authService.completeAuthentication().then(() => {
        this.router.navigate(['/home']);
      });
    });
  }
}
