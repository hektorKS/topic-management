import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SignedInUser} from "../user.model";
import {Store} from "@ngrx/store";
import {signOut} from "./authentication-actions";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const signedInUserString = localStorage.getItem('signedInUser');
    if (signedInUserString === null) {
      this.store.dispatch(signOut());
      return false;
    } else {
      const signedInUser: SignedInUser = JSON.parse(signedInUserString);
      const helper = new JwtHelperService();
      const tokenExpired = helper.isTokenExpired(signedInUser.jwtToken);
      if (tokenExpired) {
        this.store.dispatch(signOut());
        return false;
      }
      return true;
    }
  }

}
