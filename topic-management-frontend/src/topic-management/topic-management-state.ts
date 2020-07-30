import {Topic} from "./topics/topic/topic.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const topicManagementFeatureKey = 'topicManagementKey';

export const topicManagementFeatureSelector = createFeatureSelector<TopicManagementState>(topicManagementFeatureKey);
export const topicsSelector = createSelector(topicManagementFeatureSelector, state => state.topics ?? []);

export interface TopicManagementState {
  topics: Topic[];
}

export const initialState: TopicManagementState = {
  topics: []
};
