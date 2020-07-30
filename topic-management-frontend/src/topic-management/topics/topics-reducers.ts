import {Action, createReducer, on} from "@ngrx/store";
import {topicsLoaded} from "./topics-actions";
import {initialState, TopicManagementState} from "../topic-management-state";

const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(topicsLoaded, (state, action) => ({...state, topics: action.topics}))
)

export function reducer(state: TopicManagementState = initialState, action: Action): TopicManagementState {
  return topicManagementReducer(state, action);
}
