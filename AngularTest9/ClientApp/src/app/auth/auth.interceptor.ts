import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;

    this.authService.onConfigurationLoaded.subscribe(() => {

    })
    if (this.authService.isLoggedIn()) {
      let tokenValue = this.authService.getAuthorizationHeaderValue();
      requestToForward = req.clone({ setHeaders: { 'Authorization': tokenValue } });
    }

    return next.handle(requestToForward).pipe(catchError(error => {
      console.error('Error Occurred!');
      console.error(error);

      return Observable.throw(error);
    }));
  }
}
