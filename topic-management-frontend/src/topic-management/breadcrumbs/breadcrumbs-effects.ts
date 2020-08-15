import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {map, tap, withLatestFrom} from "rxjs/operators";
import {breadcrumbsChanged, breadcrumbsDestroyed, changeBreadcrumb, popBreadcrumb} from "./breadcrumbs-actions";
import {breadcrumbsSelector} from "./breadcrumbs-state";
import {Router} from "@angular/router";
import {topicManagementApplicationInitialized} from "../topic-management-actions";

@Injectable()
export class BreadcrumbsEffects {

  constructor(private store: Store,
              private router: Router,
              private actions$: Actions) {
  }

  initializeBreadcrumbsOnAppStart$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicManagementApplicationInitialized),
      withLatestFrom(this.store.select(breadcrumbsSelector)),
      map(([_, currentBreadcrumbs]) => {
        const breadcrumbsString = localStorage.getItem('breadcrumbs');
        if (breadcrumbsString !== null) {
          return JSON.parse(breadcrumbsString);
        } else {
          return currentBreadcrumbs;
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
    return this.actions$.pipe(
        ofType(changeBreadcrumb),
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

  $popBreadcrumb: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(popBreadcrumb),
      withLatestFrom(this.store.select(breadcrumbsSelector)),
      map(([_, breadcrumbs]) => {
        if (breadcrumbs.length < 2) {
          return;
        }
        const oneBeforeLast = breadcrumbs[breadcrumbs.length - 2];
        this.router.navigateByUrl(oneBeforeLast.url).then(() =>
          this.store.dispatch(changeBreadcrumb(oneBeforeLast))
        );
        return _;
      })
    );
  }, {dispatch: false});
}
