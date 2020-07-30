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
        map(([newBreadcrumb, breadcrumbs]) => {
          breadcrumbs.map(breadcrumb => breadcrumb.active = false);
          const breadcrumb = breadcrumbs.find(breadcrumb => breadcrumb.name == newBreadcrumb.name);
          if (breadcrumb !== undefined) {
            breadcrumb.active = true;
            return breadcrumbs;
          } else {
            const newBreadcrumbs = [
              ...breadcrumbs,
            ]
            newBreadcrumbs.push({
              name: newBreadcrumb.name,
              active: true
            })
            return newBreadcrumbs
          }
        }),
        map(breadcrumbs => breadcrumbsChanged({breadcrumbs: breadcrumbs}))
      );
  });

}
