import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Bucket} from "./bucket.model";
import {OperationType} from "../../operation/operation-type";

export interface BucketState {
  inProgress: boolean;
  operationType: OperationType;
  bucket: Bucket;
}

export const newBucketKey = 'newBucketKey';
export const bucketFeatureSelector = createFeatureSelector<BucketState>(newBucketKey);
export const bucketOperationInProgressSelector = createSelector(bucketFeatureSelector, state => state.inProgress ?? false)
export const bucketOperationTypeSelector = createSelector(bucketFeatureSelector, state => state.operationType)
export const bucketSelector = createSelector(bucketFeatureSelector, state => state.bucket)

export const initialBucketsState: BucketState = {
  inProgress: false,
  operationType: undefined,
  bucket: undefined
}
