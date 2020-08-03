import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {flatMap, map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {BucketsService} from "./buckets.service";
import {bucketSelected, bucketsLoaded, bucketsViewOpened} from "./buckets-actions";
import {changeBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";

@Injectable()
export class BucketsEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private router: Router,
              private route: ActivatedRoute,
              private bucketsService: BucketsService) {
  }

  reloadBuckets$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(bucketsViewOpened),
        flatMap(payload => this.bucketsService.getBucketsInSchool(payload.schoolId)
          .pipe(map(buckets => {
            return {buckets: buckets, schoolId: payload.schoolId};
          }))),
        map(payloadWithBuckets => bucketsLoaded(payloadWithBuckets)));
    }
  );

  changeBreadcrumbsOnBucketSelected$: Observable<Action> = createEffect(() => {
      return this.actions$.pipe(
        ofType(bucketSelected),
        flatMap(bucket => {
          return this.router.navigate(['schools', bucket.schoolId, 'buckets', bucket.id])
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
