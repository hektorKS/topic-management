import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {School} from "./schools/school/school.model";
import {Bucket} from "./buckets/bucket/bucket.model";

export const topicManagementFeatureKey = 'topicManagementKey';

export const topicManagementFeatureSelector = createFeatureSelector<TopicManagementState>(topicManagementFeatureKey);
export const topicsSelector = createSelector(topicManagementFeatureSelector, state => state.topics ?? []);
export const schoolsSelector = createSelector(topicManagementFeatureSelector, state => state.schools ?? []);
export const schoolSelector = createSelector(topicManagementFeatureSelector,
  (state, properties) => state.schools.find(school => school.id == properties.schoolId)
);
export const bucketsInSchoolSelector = createSelector(
  topicManagementFeatureSelector,
  (state, properties) => state.schoolBuckets.get(properties.schoolId) ?? []
);
export const activeBucketSelector = createSelector(topicManagementFeatureSelector, state => state.activeBucket);
export const activeTopicSelector = createSelector(topicManagementFeatureSelector, state => state.activeTopic);

export interface TopicManagementState {
  schools: School[];
  schoolBuckets: Map<string, Bucket[]>;
  activeBucket: Bucket;
  topics: Topic[];
  activeTopic: Topic;
}

export const initialState: TopicManagementState = {
  schools: [],
  schoolBuckets: new Map(),
  activeBucket: undefined,
  topics: [],
  activeTopic: undefined
};
