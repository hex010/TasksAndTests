import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { EMPTY, Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  private handleHttpError(err: HttpErrorResponse) : Observable<any> {
    if (err.status === 401) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
       return EMPTY;
    }

    //kiti errorai bus sugauti subscriber'io, servisu, componentu
    return throwError(err);
  }

  intercept(req : HttpRequest<any>, next : 	HttpHandler) {
    let authService = this.injector.get(AuthenticationService)
    const jwtToken = authService.getToken();

    if(jwtToken === null) return next.handle(req);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    return next.handle(tokenizedReq).pipe(catchError(err => this.handleHttpError(err)));
  }
  
}
