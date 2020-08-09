import {createAction, props} from "@ngrx/store";
import {Bucket, BucketStateView} from "./bucket.model";

export enum BucketActions {
  NEW_BUCKET_BUTTON_CLICKED = '[Bucket] New bucket button clicked',
  NEW_BUCKET_INITIALIZED = '[Bucket] New bucket initialized',
  NEW_BUCKET_SUBMITTED = '[Bucket] New bucket submitted',
  UPDATE_BUCKET_SUBMITTED = '[Bucket] Update bucket submitted',
  BUCKET_UPDATED = '[Bucket] Bucket updated',
  NEW_BUCKET_CREATED = '[Bucket] New bucket created',
  BUCKET_FORM_UPDATED = '[Bucket] Bucket form updated',
  BUCKET_FORM_CANCEL_BUTTON_CLICKED = '[Bucket] Bucket form cancel button clicked',
  BUCKET_EDIT_BUTTON_CLICKED = '[Bucket] Bucket edit button clicked',
  BUCKET_DELETE_BUTTON_CLICKED = '[Bucket] Bucket delete button clicked',
  BUCKET_DELETED = '[Bucket] Bucket deleted'
}

export const newBucketButtonClicked = createAction(BucketActions.NEW_BUCKET_BUTTON_CLICKED);
export const newBucketInitialized = createAction(BucketActions.NEW_BUCKET_INITIALIZED, props<{ bucketView: BucketStateView }>());
export const newBucketSubmitted = createAction(BucketActions.NEW_BUCKET_SUBMITTED);
export const newBucketCreated = createAction(BucketActions.NEW_BUCKET_CREATED, props<{ bucketView: BucketStateView }>());
export const updateBucketSubmitted = createAction(BucketActions.UPDATE_BUCKET_SUBMITTED);
export const bucketUpdated = createAction(BucketActions.BUCKET_UPDATED, props<{ bucketView: BucketStateView }>());
export const bucketFormUpdated = createAction(BucketActions.BUCKET_FORM_UPDATED, props<{ bucket: Partial<Bucket> }>());
export const bucketFormCancelButtonClicked = createAction(BucketActions.BUCKET_FORM_CANCEL_BUTTON_CLICKED);
export const bucketEditButtonClicked = createAction(BucketActions.BUCKET_EDIT_BUTTON_CLICKED, props<{ bucket: Bucket }>());
export const bucketDeleteButtonClicked = createAction(BucketActions.BUCKET_DELETE_BUTTON_CLICKED, props<{ bucketId: string }>());
export const bucketDeleted = createAction(BucketActions.BUCKET_DELETED, props<{ bucketId: string }>());

