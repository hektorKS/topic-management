import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Bucket} from "../bucket/bucket.model";

export interface NewBucketState {
  inProgress: boolean
  bucket: Bucket
}

export const newBucketKey = 'newBucketKey';
export const newBucketFeatureSelector = createFeatureSelector<NewBucketState>(newBucketKey);
export const newBucketInProgressSelector = createSelector(newBucketFeatureSelector, state => state.inProgress ?? false)
export const newBucketSelector = createSelector(newBucketFeatureSelector, state => state.bucket)

export const initialBucketsState = {
  inProgress: false,
  bucket: undefined
}
