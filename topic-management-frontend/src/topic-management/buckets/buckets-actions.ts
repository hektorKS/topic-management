import {createAction, props} from "@ngrx/store";
import {Bucket} from "./bucket/bucket.model";

export enum BucketsActions {
  BUCKETS_VIEW_OPENED = '[Bucket] Buckets view opened',
  BUCKETS_LOADED = '[Bucket] Buckets loaded'
}

export const bucketsViewOpened = createAction(BucketsActions.BUCKETS_VIEW_OPENED, props<{ schoolId: string }>());
export const bucketsLoaded = createAction(BucketsActions.BUCKETS_LOADED, props<{ schoolId: string, buckets: Bucket[] }>());

