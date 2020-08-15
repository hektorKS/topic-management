import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadSignedInUser, signedIn, signedOut} from "./user/authentication/authentication-actions";
import {map, tap} from "rxjs/operators";
import {topicManagementApplicationInitialized} from "./topic-management-actions";
import {Router} from "@angular/router";

@Injectable()
export class TopicManagementEffects {

  constructor(private store: Store,
              private router: Router,
              private actions$: Actions) {
  }

  loadSignedInUser$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicManagementApplicationInitialized),
      map(_ => {
        const signedInUser = localStorage.getItem('signedInUser');
        if (signedInUser !== null) {
          return loadSignedInUser(JSON.parse(signedInUser));
        } else {
          return signedOut();
        }
      })
    );
  });

  signedIn$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signedIn),
      tap(_ => this.router.navigate(['schools']))
    );
  }, {dispatch: false});

  signedOut$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signedOut),
      tap(_ => localStorage.removeItem('signedInUser')),
      tap(_ => this.router.navigate(['sign-in'])));
  }, {dispatch: false});

}
