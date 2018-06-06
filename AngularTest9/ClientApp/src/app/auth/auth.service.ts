import { Injectable, EventEmitter, Output } from '@angular/core';
import { UserManager, User, Log, UserManagerSettings } from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  @Output() onConfigurationLoaded = new EventEmitter<boolean>();
  manager: UserManager;
  settings: UserManagerSettings
  user: User = null;

  constructor(private http: HttpClient) {
    Log.logger = console;
    Log.level = Log.DEBUG;
  }


  configureAuthentication(configUrl: string): void {
    console.log('get auth config data');
    this.configureSettings(configUrl).subscribe(() => {
      this.onConfigurationLoaded.emit(true);
    });
  }

  startAuthentication(): Promise<void> {
    console.log('start login');
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }


  private configureSettings(configUrl: string): Observable<void> {
    return this.http.get(configUrl).pipe(map(data => {
      this.manager = new UserManager(data as UserManagerSettings);
      console.log(this.manager.settings.checkSessionInterval);
    }));
  }
}
