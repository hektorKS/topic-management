import {createAction, props} from "@ngrx/store";
import {BucketStateView} from "../bucket/bucket.model";

export enum NewBucketActions {
  NEW_BUCKET_BUTTON_CLICKED = '[New bucket] New bucket button clicked',
  NEW_BUCKET_CANCELED = '[New bucket] New bucket canceled',
  NEW_BUCKET_APPROVED = '[New bucket] New bucket approved',
  NEW_BUCKET_CREATED = '[New bucket] New bucket created',
  NEW_BUCKET_FORM_UPDATED = '[New bucket] New bucket form updated',
  NEW_BUCKET_INITIALIZED = '[New bucket] New bucket initialized'
}

export const newBucketButtonClicked = createAction(NewBucketActions.NEW_BUCKET_BUTTON_CLICKED);
export const newBucketCanceled = createAction(NewBucketActions.NEW_BUCKET_CANCELED);
export const newBucketApproved = createAction(NewBucketActions.NEW_BUCKET_APPROVED);
export const newBucketCreated = createAction(NewBucketActions.NEW_BUCKET_CREATED, props<{ bucketView: BucketStateView }>());
export const newBucketFormUpdated = createAction(NewBucketActions.NEW_BUCKET_FORM_UPDATED, props<{ bucketView: Partial<BucketStateView> }>());
export const newBucketInitialized = createAction(NewBucketActions.NEW_BUCKET_INITIALIZED, props<{ bucketView: BucketStateView }>());

