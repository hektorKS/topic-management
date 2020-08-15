import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignedInUser} from "../user.model";

export class AuthenticationInterceptor<T> implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const signedInUserString = localStorage.getItem('signedInUser');
    if (signedInUserString !== null) {
      const signedInUser: SignedInUser = JSON.parse(signedInUserString);
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${signedInUser.jwtToken}`)
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
