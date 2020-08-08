import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, flatMap, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {BucketsService} from "./buckets.service";
import {bucketLoaded, bucketSelected, bucketsInSchoolLoaded, loadBucket, loadBucketsInSchool} from "./buckets-actions";
import {changeBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";

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
          .pipe(map(buckets => {
            return {buckets: buckets, schoolId: payload.schoolId};
          }))),
        map(payloadWithBuckets => bucketsInSchoolLoaded(payloadWithBuckets)));
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
