import {Injectable} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TopicsService} from "./topics.service";
import {
  cancelNewTopic,
  deleteTopic,
  initNewTopic,
  loadTopic,
  loadTopicsInBucket,
  newTopicButtonSelected,
  newTopicSaved,
  saveNewTopic,
  topicDeleted,
  topicLoaded,
  topicSelected,
  topicsInBucketLoaded,
  topicUpdated,
  updateTopic,
} from "./topics-actions";
import {debounceTime, exhaustMap, flatMap, map, withLatestFrom} from "rxjs/operators";
import {changeBreadcrumb, popBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";
import {Router} from "@angular/router";
import {selectBucketId} from "../topic-management-router-state";
import {currentUserSelector} from "../topic-management-state";

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
      exhaustMap(payload => {
        return this.topicsService.getTopicsView(payload.bucketId).pipe(
          map(topics => ({
            bucketId: payload.bucketId,
            topics: topics
          }))
        );
      }),
      map(payload => topicsInBucketLoaded(payload))
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
      ofType(updateTopic),
      debounceTime(100),
      exhaustMap(topic => {
        this.topicsService.updateTopic(topic);
        return topic.id;
      }),
      map(topicId => topicUpdated({topicId: topicId}))
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

  topicSelected$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicSelected),
      debounceTime(100),
      flatMap(topic => {
        return this.router.navigate(['buckets', topic.bucketId, 'topics', topic.id])
          .then(_ => changeBreadcrumb({
              name: topic.title,
              url: this.router.url
            })
          );
      })
    );
  });

  newTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(newTopicButtonSelected),
      debounceTime(100),
      withLatestFrom(this.store.select(selectBucketId)),
      flatMap(([_, bucketId]) => {
        return this.router.navigate(['buckets', bucketId, 'topics', 'new-topic'])
          .then(_ => changeBreadcrumb({
              name: "New topic",
              url: this.router.url
            })
          );
      })
    );
  });

  initNewTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(initNewTopic),
      flatMap(_ => combineLatest([
        this.store.select(selectBucketId),
        this.store.select(currentUserSelector)
      ])),
      map(([bucketId, currentUser]) =>
        topicLoaded({
          id: undefined,
          bucketId: bucketId,
          title: '',
          description: '',
          supervisor: currentUser,
          students: []
        }))
    );
  });

  popBreadcrumbActions$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(topicDeleted, topicUpdated, cancelNewTopic, newTopicSaved),
      map(popBreadcrumb)
    );
  });

  saveNewTopic$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveNewTopic),
      exhaustMap(topic => this.topicsService.saveTopic(topic)),
      map(newTopicSaved)
    );
  });

}
