import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {flatMap, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {BucketsService} from "./buckets.service";
import {bucketsLoaded, bucketsViewOpened} from "./buckets-actions";

@Injectable()
export class BucketsEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private router: Router,
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

}
