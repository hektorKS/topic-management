import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {clearUserData, loadSignedInUser, signedIn, signOut} from "./users/authentication/authentication-actions";
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
          return signOut();
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

  signOut$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signOut),
      tap(_ => localStorage.clear()),
      tap(_ => this.router.navigate(['sign-in'])),
      map(clearUserData)
    );
  });

}
