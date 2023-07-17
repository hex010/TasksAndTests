import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req : HttpRequest<any>, next : 	HttpHandler) {
    let authService = this.injector.get(AuthenticationService)
    const jwtToken = authService.getToken();

    if(jwtToken === null) return next.handle(req);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    })

    return next.handle(tokenizedReq);
  }
  
}
