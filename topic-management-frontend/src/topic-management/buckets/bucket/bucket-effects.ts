import {Injectable} from "@angular/core";
import {Action, select, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {combineLatest, Observable} from "rxjs";
import {debounceTime, exhaustMap, first, flatMap, map, tap, withLatestFrom} from "rxjs/operators";
import {
  bucketDeleteButtonClicked,
  bucketDeleted,
  bucketUpdated,
  newBucketButtonClicked,
  newBucketCreated,
  newBucketInitialized,
  newBucketSubmitted,
  updateBucketSubmitted
} from "./bucket-actions";
import {selectSchoolId} from "../../topic-management-router-state";
import {bucketsInSchoolSelector, currentUserSelector} from "../../topic-management-state";
import {BucketsService} from "../buckets.service";
import {bucketSelector} from "./bucket-state";
import {BucketState} from "./bucket.model";
import {updateBucketsInSchool} from "../buckets-actions";

@Injectable()
export class BucketEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private bucketsService: BucketsService) {
  }

  newBucketButtonClicked$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(newBucketButtonClicked),
      debounceTime(100),
      flatMap(_ => combineLatest([
        this.store.select(selectSchoolId),
        this.store.select(currentUserSelector)
      ]).pipe(first())),
      map(([schoolId, currentUser]) =>
        newBucketInitialized({
          bucketView: {
            id: undefined,
            name: '',
            ownerId: currentUser.id,
            schoolId: schoolId,
            bucketState: BucketState.NEW
          }
        }))
    );
  });

  newBucketSubmitted$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(newBucketSubmitted),
      withLatestFrom(this.store.select(bucketSelector)),
      exhaustMap(([_, bucket]) => this.bucketsService.createNewBucket(bucket)
        .pipe(map(bucketId => ({
            ...bucket,
            id: bucketId,
            bucketState: BucketState.UNCHANGED
          }))
        )),
      map(bucketView => newBucketCreated({bucketView: bucketView}))
    );
  });

  updateBucketSubmitted$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateBucketSubmitted),
      withLatestFrom(this.store.select(bucketSelector)),
      exhaustMap(([_, bucket]) => {
        return combineLatest([this.bucketsService.updateBucket(bucket).pipe(
          map(_ => ({
            ...bucket,
            bucketState: BucketState.UNCHANGED
          })),
          tap(bucketView => this.store.dispatch(bucketUpdated({bucketView: bucketView})))
        ), this.store.pipe(select(bucketsInSchoolSelector, {schoolId: bucket.schoolId}), first())]).pipe(
          map(([updatedBucket, bucketsInSchool]) => {
            const newBuckets = [];
            for (const bucket of bucketsInSchool) {
              if (bucket.id == updatedBucket.id) {
                newBuckets.push(updatedBucket);
              } else {
                newBuckets.push(bucket);
              }
            }
            return {schoolId: bucket.schoolId, bucketViews: newBuckets}
          })
        )
      }),
      map(payload => updateBucketsInSchool(payload))
    );
  });

  bucketDeleteButtonClicked$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(bucketDeleteButtonClicked),
        exhaustMap(payload => this.bucketsService.deleteBucket(payload.bucketId).pipe(map(_ => payload))),
        map(payload => bucketDeleted(payload))
      )
    }
  );

}
