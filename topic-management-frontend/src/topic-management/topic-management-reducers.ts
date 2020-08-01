import {createReducer, on} from "@ngrx/store";
import {schoolsLoaded} from "./schools/schools-actions";
import {topicsLoaded} from "./topics/topics-actions";
import {initialState, TopicManagementState} from "./topic-management-state";
import {bucketsLoaded} from "./buckets/buckets-actions";

export const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(topicsLoaded, (state, action) => ({...state, topics: action.topics})),
  on(schoolsLoaded, (state, action) => ({...state, schools: action.schools})),
  on(bucketsLoaded, (state, action) => {
    state.schoolBuckets.set(action.schoolId, action.buckets);
    return {...state};
  })
)
