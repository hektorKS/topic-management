import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {School} from "./schools/school/school.model";
import {Bucket} from "./buckets/bucket/bucket.model";
import {User, UsernameUser} from "./user/user.model";

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

export const currentUserIdSelector = createSelector(topicManagementFeatureSelector, state => state.loggedInUser.id);

export interface TopicFormState {
  originalTopic: Topic;
  topic: Topic;
  autocompletionUsers: UsernameUser[];
}

export interface TopicManagementState {
  loggedInUser: User;
  schools: School[];
  schoolBuckets: Map<string, Bucket[]>;
  activeBucket: Bucket;
  bucketTopics: Map<string, Topic[]>,
  topics: Topic[];
  topicFormState: TopicFormState;
}

export const initialTopicFormState: TopicFormState = {
  originalTopic: undefined,
  topic: undefined,
  autocompletionUsers: []
}

export const initialState: TopicManagementState = {
  loggedInUser: { // MOCKED
    id: "eead90cb-c539-4e27-b937-87e9f067b596",
    firstName: "Konrad",
    lastName: "Szyszka",
    username: "hektorKS"
  },
  schools: [],
  schoolBuckets: new Map(),
  activeBucket: undefined,
  bucketTopics: new Map(),
  topics: [],
  topicFormState: initialTopicFormState
};
