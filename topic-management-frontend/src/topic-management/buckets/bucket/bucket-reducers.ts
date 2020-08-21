import {Action, createReducer, on} from "@ngrx/store";
import {BucketState, initialBucketsState} from "./bucket-state";
import {
  bucketEditButtonClicked,
  bucketFormCancelButtonClicked,
  bucketFormUpdated,
  bucketUpdated,
  newBucketCreated,
  newBucketInitialized
} from "./bucket-actions";
import {Bucket} from "./bucket.model";
import {OperationType} from "../../operation/operation-type";

const reducer = createReducer<BucketState>(
  initialBucketsState,
  on(newBucketInitialized, (state, action) => ({
    ...state,
    inProgress: true,
    operationType: OperationType.CREATE,
    bucket: action.bucketView
  })),
  on(bucketFormCancelButtonClicked, newBucketCreated, bucketUpdated, () => ({
    ...initialBucketsState
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

export function bucketReducer(state: BucketState = initialBucketsState, action: Action): BucketState {
  return reducer(state, action);
}
