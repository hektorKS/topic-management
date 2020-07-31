import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {map, withLatestFrom} from "rxjs/operators";
import {breadcrumbsChanged, changeBreadcrumb} from "./breadcrumbs-actions";
import {breadcrumbsSelector} from "./breadcrumbs-state";

@Injectable()
export class BreadcrumbsEffects {

  constructor(private store: Store,
              private actions$: Actions) {
  }

  changeBreadcrumb$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(changeBreadcrumb))
      .pipe(
        withLatestFrom(this.store.select(breadcrumbsSelector)),
        map(([newBreadcrumb, oldBreadcrumbs]) => {
          const newBreadcrumbs = []
          let found = false;
          for (const breadcrumb of oldBreadcrumbs) {
            if (breadcrumb.name == newBreadcrumb.name) {
              found = true;
              newBreadcrumbs.push({
                name: newBreadcrumb.name,
                active: true
              });
              break;
            } else {
              newBreadcrumbs.push({...breadcrumb, active: false});
            }
          }
          if (!found) {
            newBreadcrumbs.push({
              name: newBreadcrumb.name,
              active: true
            });
          }
          return newBreadcrumbs;
        }),
        map(breadcrumbs => breadcrumbsChanged({breadcrumbs: breadcrumbs}))
      );
  });

}
