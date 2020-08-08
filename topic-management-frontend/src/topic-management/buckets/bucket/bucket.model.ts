export interface Bucket {
  id: string;
  name: string;
  ownerId: string;
  schoolId: string;
}

export interface BucketStateView extends Bucket {
  bucketState: BucketState;
}

export enum BucketState {
  UNCHANGED,
  CHANGED,
  NEW,
}
