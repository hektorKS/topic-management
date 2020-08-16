import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {signedIn, signInButtonClicked, signInFailed} from "./authentication-actions";
import {catchError, exhaustMap, map, tap, withLatestFrom} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";
import {signInDataSelector} from "./authentication-state";
import {Router} from "@angular/router";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetInfoComponent} from "../../bottom-sheet/bottom-sheet-info.component";

@Injectable()
export class AuthenticationEffects {

  constructor(private store: Store,
              private router: Router,
              private actions$: Actions,
              private bottomSheet: MatBottomSheet,
              private authenticationService: AuthenticationService) {
  }

  signInButtonClicked$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInButtonClicked),
      withLatestFrom(this.store.select(signInDataSelector)),
      exhaustMap(([_, signInData]) => this.authenticationService.signIn(signInData)
        .pipe(
          catchError(error => {
            this.store.dispatch(signInFailed());
            throw error;
          })
        )
      ),
      map(signedInUser => signedIn(signedInUser))
    );
  });

  signInFailed$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInFailed),
      tap(_ => {
        this.bottomSheet.open(BottomSheetInfoComponent, {
          data: {text: 'Login failed. Wrong login or password.'}
        });
      })
    );
  }, {dispatch: false});

  signedIn$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(signedIn),
      tap(signedInUser => localStorage.setItem('signedInUser', JSON.stringify(signedInUser)))
    );
  }, {dispatch: false});
}
