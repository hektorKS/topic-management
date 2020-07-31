import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TopicsService} from "./topics.service";
import {topicsLoaded, topicsViewOpened} from "./topics-actions";
import {exhaustMap, map} from "rxjs/operators";
import {changeBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";
import {Router} from "@angular/router";

@Injectable()
export class TopicsEffects {

  constructor(private store: Store,
              private router: Router,
              private actions$: Actions,
              private topicsService: TopicsService) {
  }

  reloadTopics$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(topicsViewOpened))
      .pipe(
        exhaustMap(_ => this.topicsService.getTopics()),
        map(topics => topicsLoaded({topics: topics}))
      );
  });

  topicsViewOpened$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(topicsViewOpened))
      .pipe(
        map(_ => changeBreadcrumb({name: 'topics', url: this.router.url}))
      );
  });

}
