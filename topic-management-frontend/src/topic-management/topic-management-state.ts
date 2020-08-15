import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {School} from "./schools/school/school.model";
import {Bucket, BucketStateView} from "./buckets/bucket/bucket.model";
import {SignedInUser, User, UsernameUser} from "./user/user.model";

export const topicManagementFeatureKey = 'topicManagementKey';

export const topicManagementFeatureSelector = createFeatureSelector<TopicManagementState>(topicManagementFeatureKey);
export const schoolsSelector = createSelector(topicManagementFeatureSelector, state => state.schools ?? []);
export const schoolSelector = createSelector(topicManagementFeatureSelector,
  (state, properties) => state.schools.find(school => school.id == properties.schoolId)
);

export const bucketsInSchoolSelector = createSelector(
  topicManagementFeatureSelector,
  (state, properties) => state.schoolBuckets.get(properties.schoolId) ?? []
);
export const activeBucketSelector = createSelector(topicManagementFeatureSelector, state => state.activeBucket);

export const topicsInBucketSelector = createSelector(
  topicManagementFeatureSelector,
  (state, properties) => state.bucketTopics.get(properties.bucketId) ?? []
);

export const formTopicSelector = createSelector(topicManagementFeatureSelector, state => state.topicFormState.topic);
export const formTopicAutocompletionUsersSelector = createSelector(topicManagementFeatureSelector, state => state.topicFormState.autocompletionUsers);
export const formSendMessageSelector = createSelector(topicManagementFeatureSelector, state => state.topicFormState.sendMessage);

export const currentUserSelector = createSelector(topicManagementFeatureSelector, state => state.signedInUser?.user);
export const userSignedInSelector = createSelector(topicManagementFeatureSelector, state => state.signedInUser !== undefined);
export const currentUserIdSelector = createSelector(currentUserSelector, user => user?.id);

export const ownerSelector = createSelector(
  currentUserIdSelector,
  (currentUserId, properties) => currentUserId == properties.ownerId
);

export interface TopicFormState {
  originalTopic: Topic;
  topic: Topic;
  sendMessage: boolean,
  autocompletionUsers: UsernameUser[];
}

export interface TopicManagementState {
  signedInUser: SignedInUser;
  schools: School[];
  schoolBuckets: Map<string, BucketStateView[]>;
  activeBucket: Bucket;
  bucketTopics: Map<string, Topic[]>,
  topics: Topic[];
  topicFormState: TopicFormState;
}

export const initialTopicFormState: TopicFormState = {
  originalTopic: undefined,
  topic: undefined,
  sendMessage: false,
  autocompletionUsers: []
}

export const initialState: TopicManagementState = {
  signedInUser: undefined,
  schools: [],
  schoolBuckets: new Map(),
  activeBucket: undefined,
  bucketTopics: new Map(),
  topics: [],
  topicFormState: initialTopicFormState
};
