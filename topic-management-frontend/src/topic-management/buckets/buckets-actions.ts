import {createAction, props} from "@ngrx/store";
import {Bucket} from "./bucket/bucket.model";

export enum BucketsActions {
  LOAD_BUCKET = '[Bucket] Load bucket',
  LOAD_BUCKETS_IN_SCHOOL = '[Bucket] Load buckets in school',
  BUCKET_LOADED = '[Bucket] Bucket loaded',
  BUCKETS_LOADED = '[Bucket] Buckets loaded',
  BUCKET_SELECTED = '[Bucket] Bucket selected'
}

export const loadBucketsInSchool = createAction(BucketsActions.LOAD_BUCKETS_IN_SCHOOL, props<{ schoolId: string }>());
export const bucketsInSchoolLoaded = createAction(BucketsActions.BUCKETS_LOADED, props<{ schoolId: string, buckets: Bucket[] }>());
export const loadBucket = createAction(BucketsActions.LOAD_BUCKET, props<{ bucketId: string }>())
export const bucketLoaded = createAction(BucketsActions.BUCKET_LOADED, props<Bucket>());
export const bucketSelected = createAction(BucketsActions.BUCKET_SELECTED, props<Bucket>());

