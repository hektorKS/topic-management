import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {School} from "./schools/school/school.model";
import {Bucket} from "./buckets/bucket/bucket.model";

export const topicManagementFeatureKey = 'topicManagementKey';

export const topicManagementFeatureSelector = createFeatureSelector<TopicManagementState>(topicManagementFeatureKey);
export const topicsSelector = createSelector(topicManagementFeatureSelector, state => state.topics ?? []);
export const schoolsSelector = createSelector(topicManagementFeatureSelector, state => state.schools ?? []);
export const bucketsInSchoolSelector = createSelector(
  topicManagementFeatureSelector,
  (state, properties) => state.schoolBuckets.get(properties.schoolId) ?? []
);

export interface TopicManagementState {
  schools: School[];
  schoolBuckets: Map<string, Bucket[]>
  topics: Topic[];
}

export const initialState: TopicManagementState = {
  schools: [],
  schoolBuckets: new Map(),
  topics: []
};
