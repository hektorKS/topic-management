import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, select, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, first, flatMap, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {BucketsService} from "./buckets.service";
import {bucketLoaded, bucketSelected, updateBucketsInSchool, loadBucket, loadBucketsInSchool} from "./buckets-actions";
import {changeBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";
import {bucketEditButtonClicked} from "./bucket/bucket-actions";
import {bucketsInSchoolSelector} from "../topic-management-state";
import {BucketState} from "./bucket/bucket.model";

@Injectable()
export class BucketsEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private router: Router,
              private bucketsService: BucketsService) {
  }

  loadBucketsInSchool$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadBucketsInSchool),
        exhaustMap(payload => this.bucketsService.getBucketsInSchool(payload.schoolId)
          .pipe(map(bucketViews => {
            return {bucketViews: bucketViews, schoolId: payload.schoolId};
          }))),
        map(payloadWithBuckets => updateBucketsInSchool(payloadWithBuckets)));
    }
  );

  loadBucket$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(loadBucket),
        exhaustMap(payload => this.bucketsService.getBucketById(payload.bucketId)),
        map(bucket => bucketLoaded(bucket))
      )
    }
  );

  bucketEditButtonClicked$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(bucketEditButtonClicked),
      flatMap(payload =>
        this.store.pipe(
          select(bucketsInSchoolSelector, {schoolId: payload.bucket.schoolId}),
          first(),
          map(bucketsInSchool => {
            const newBuckets = [];
            for (const bucket of bucketsInSchool) {
              if (bucket.id == payload.bucket.id) {
                newBuckets.push({
                  ...payload.bucket,
                  bucketState: BucketState.EDIT
                });
              } else {
                newBuckets.push(bucket);
              }
            }
            return {schoolId: payload.bucket.schoolId, bucketViews: newBuckets};
          }),
          map(payload => updateBucketsInSchool(payload))
        ))
    );
  });

  changeBreadcrumbsOnBucketSelected$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(bucketSelected),
      flatMap(bucket => {
        return this.router.navigate(['buckets', bucket.id])
          .then(_ => changeBreadcrumb({
              name: bucket.name,
              url: this.router.url
            })
            );
        })
      );
    }
  );

}
