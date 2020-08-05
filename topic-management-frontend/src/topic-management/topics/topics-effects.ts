import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TopicsService} from "./topics.service";
import {
  deleteTopic,
  loadTopic,
  loadTopicsInBucket,
  saveTopic,
  topicDeleted,
  topicLoaded,
  topicSaved,
  topicSelected,
  topicsInBucketLoaded,
} from "./topics-actions";
import {debounceTime, exhaustMap, flatMap, map, tap, withLatestFrom} from "rxjs/operators";
import {changeBreadcrumb, popBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";
import {Router} from "@angular/router";
import {selectSchoolId} from "../topic-management-router-state";

@Injectable()
export class TopicsEffects {

  constructor(private store: Store,
              private router: Router,
              private actions$: Actions,
              private topicsService: TopicsService) {
  }

  loadTopicsInBucket$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTopicsInBucket),
      debounceTime(100),
      exhaustMap(payload => this.topicsService.getTopicsView(payload.bucketId)),
      map(topics => topicsInBucketLoaded({topics: topics}))
    );
  });

  loadTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTopic),
      debounceTime(100),
      exhaustMap(payload => this.topicsService.getTopicView(payload.topicId)),
      map(topic => topicLoaded(topic))
    );
  });

  saveTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveTopic),
      debounceTime(100),
      exhaustMap(topic => {
        this.topicsService.updateTopic(topic);
        return topic.id;
      }),
      map(topicId => topicSaved({topicId: topicId}))
    );
  });

  deleteTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTopic),
      debounceTime(100),
      exhaustMap(payload => {
        this.topicsService.deleteTopic(payload.topicId);
        return payload.topicId;
      }),
      map(topicId => topicDeleted({topicId: topicId}))
    );
  });

  topicDeleted$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicDeleted),
      tap(_ => this.store.dispatch(popBreadcrumb()))
    );
  }, {dispatch: false});

  topicSelected$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicSelected),
      debounceTime(100),
      withLatestFrom(this.store.select(selectSchoolId)),
      flatMap(([topic, schoolId]) => {
        return this.router.navigate(['schools', schoolId, 'buckets', topic.bucketId, 'topics', topic.id])
          .then(_ => changeBreadcrumb({
              name: topic.title,
              url: this.router.url
            })
          );
      })
    );
  });

}
