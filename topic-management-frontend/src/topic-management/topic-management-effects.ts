import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {clearUserData, loadSignedInUser, signedIn, signOut} from "./users/authentication/authentication-actions";
import {map, tap} from "rxjs/operators";
import {topicManagementApplicationInitialized} from "./topic-management-actions";
import {Router} from "@angular/router";
import {conversationListOpened} from "./messages/conversation/conversation-list/conversation-list-actions";
import {changeBreadcrumb, startBreadcrumbPath} from "./breadcrumbs/breadcrumbs-actions";

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

  conversationListOpened$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(conversationListOpened),
      map(_ => startBreadcrumbPath({name: 'messages', url: this.router.url}))
    );
  });

}
