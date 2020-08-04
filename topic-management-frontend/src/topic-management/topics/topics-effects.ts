import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TopicsService} from "./topics.service";
import {topicsInBucketLoaded, loadTopicsInBucket} from "./topics-actions";
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
    return this.actions$.pipe(ofType(loadTopicsInBucket))
      .pipe(
        exhaustMap(payload => this.topicsService.getTopicsView(payload.bucketId)),
        map(topics => {
          return topicsInBucketLoaded({topics: topics})
        })
      );
  });

}
