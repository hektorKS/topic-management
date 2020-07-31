import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {School} from "./schools/school/school.model";

export const topicManagementFeatureKey = 'topicManagementKey';

export const topicManagementFeatureSelector = createFeatureSelector<TopicManagementState>(topicManagementFeatureKey);
export const topicsSelector = createSelector(topicManagementFeatureSelector, state => state.topics ?? []);
export const schoolsSelector = createSelector(topicManagementFeatureSelector, state => state.schools ?? []);

export interface TopicManagementState {
  schools: School[];
  topics: Topic[];
}

export const initialState: TopicManagementState = {
  schools: [],
  topics: []
};
