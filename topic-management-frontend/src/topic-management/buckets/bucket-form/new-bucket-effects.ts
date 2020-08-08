import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {combineLatest, Observable} from "rxjs";
import {exhaustMap, flatMap, map, withLatestFrom} from "rxjs/operators";
import {newBucketApproved, newBucketButtonClicked, newBucketCreated, newBucketInitialized} from "./new-bucket-actions";
import {selectSchoolId} from "../../topic-management-router-state";
import {currentUserSelector} from "../../topic-management-state";
import {BucketState} from "../bucket/bucket.model";
import {BucketsService} from "../buckets.service";
import {newBucketSelector} from "./new-bucket-state";

@Injectable()
export class NewBucketEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private bucketsService: BucketsService) {
  }

  $newBucketButtonClicked: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(newBucketButtonClicked),
      flatMap(_ => combineLatest([
        this.store.select(selectSchoolId),
        this.store.select(currentUserSelector)
      ])),
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

  $newBucketApproved: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(newBucketApproved),
      withLatestFrom(this.store.select(newBucketSelector)),
      exhaustMap(([_, bucket]) => this.bucketsService.createNewBucket(bucket)
        .pipe(map(bucketId => ({
            ...bucket,
            id: bucketId,
            bucketState: BucketState.UNCHANGED
          }))
        )),
      map(bucketView => newBucketCreated({bucketView: bucketView}))
    );
  })
}
