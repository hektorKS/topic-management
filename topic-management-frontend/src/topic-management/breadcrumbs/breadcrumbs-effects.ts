import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {map, tap, withLatestFrom} from "rxjs/operators";
import {
  breadcrumbsChanged,
  breadcrumbsDestroyed,
  breadcrumbsInitialized,
  changeBreadcrumb
} from "./breadcrumbs-actions";
import {breadcrumbsSelector} from "./breadcrumbs-state";

@Injectable()
export class BreadcrumbsEffects {

  constructor(private store: Store,
              private actions$: Actions) {
  }

  breadcrumbsInitialized$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(breadcrumbsInitialized))
      .pipe(
        map(_ => {
          const breadcrumbsString = localStorage.getItem('breadcrumbs');
          if (breadcrumbsString !== null) {
            return JSON.parse(breadcrumbsString);
          } else {
            return [];
          }
        }),
        map(breadcrumbs => breadcrumbsChanged({breadcrumbs: breadcrumbs}))
      )
  });

  breadcrumbsDestroyed$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(breadcrumbsDestroyed),
      tap(item => {
        localStorage.setItem('breadcrumbs', JSON.stringify(item.breadcrumbs))
      })
    )
  }, {dispatch: false});

  changeBreadcrumb$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(changeBreadcrumb))
      .pipe(
        withLatestFrom(this.store.select(breadcrumbsSelector)),
        map(([newBreadcrumb, oldBreadcrumbs]) => {
          const newBreadcrumbs = []
          let found = false;
          for (const breadcrumb of oldBreadcrumbs) {
            if (breadcrumb.name === newBreadcrumb.name) {
              found = true;
              newBreadcrumbs.push({
                ...newBreadcrumb,
                active: true
              });
              break;
            } else {
              newBreadcrumbs.push({...breadcrumb, active: false});
            }
          }
          if (!found) {
            newBreadcrumbs.push({
              ...newBreadcrumb,
              active: true
            });
          }
          return newBreadcrumbs;
        }),
        map(breadcrumbs => breadcrumbsChanged({breadcrumbs: breadcrumbs}))
      );
  });

}
