import {createReducer, on} from "@ngrx/store";
import {BucketState, initialBucketsState} from "./bucket-state";
import {
  bucketEditButtonClicked,
  bucketFormCancelButtonClicked,
  bucketFormUpdated,
  newBucketCreated,
  newBucketInitialized
} from "./bucket-actions";
import {Bucket} from "./bucket.model";
import {OperationType} from "../../operation/operation-type";

export const bucketReducer = createReducer<BucketState>(
  initialBucketsState,
  on(newBucketInitialized, (state, action) => ({
    ...state,
    inProgress: true,
    operationType: OperationType.CREATE,
    bucket: action.bucketView
  })),
  on(bucketFormCancelButtonClicked, newBucketCreated, state => ({
    ...state,
    inProgress: false
  })),
  on(bucketFormUpdated, (state, action: { bucket: Partial<Bucket> }) => ({
    ...state,
    bucket: {
      ...state.bucket,
      ...action.bucket
    }
  })),
  on(bucketEditButtonClicked, (state, action) => ({
    ...state,
    inProgress: true,
    operationType: OperationType.UPDATE,
    bucket: action.bucket
  }))
);

