import {createReducer, on} from "@ngrx/store";
import {topicsLoaded} from "./topics-actions";
import {initialState, TopicManagementState} from "../topic-management-state";

export const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(topicsLoaded, (state, action) => ({...state, topics: action.topics}))
)
