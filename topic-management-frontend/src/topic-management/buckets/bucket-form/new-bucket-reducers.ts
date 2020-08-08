import {createReducer, on} from "@ngrx/store";
import {initialBucketsState, NewBucketState} from "./new-bucket-state";
import {newBucketCanceled, newBucketCreated, newBucketFormUpdated, newBucketInitialized} from "./new-bucket-actions";
import {BucketStateView} from "../bucket/bucket.model";

export const newBucketReducer = createReducer<NewBucketState>(
  initialBucketsState,
  on(newBucketInitialized, (state, action) => ({
    ...state,
    inProgress: true,
    bucket: action.bucketView
  })),
  on(newBucketCanceled, newBucketCreated, state => ({
    ...state,
    inProgress: false
  })),
  on(newBucketFormUpdated, (state, action: { bucketView: Partial<BucketStateView> }) => ({
    ...state,
    bucket: {
      ...state.bucket,
      ...action.bucketView
    }
  }))
);

