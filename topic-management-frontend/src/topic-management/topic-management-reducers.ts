import {createReducer, on} from "@ngrx/store";
import {schoolsLoaded} from "./schools/schools-actions";
import {topicsInBucketLoaded} from "./topics/topics-actions";
import {initialState, TopicManagementState} from "./topic-management-state";
import {bucketLoaded, bucketsInSchoolLoaded} from "./buckets/buckets-actions";

export const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(topicsInBucketLoaded, (state, action) => ({...state, topics: action.topics})),
  on(schoolsLoaded, (state, action) => ({...state, schools: action.schools})),
  on(bucketsInSchoolLoaded, (state, action) => {
    state.schoolBuckets.set(action.schoolId, action.buckets);
    return {...state};
  }),
  on(bucketLoaded, (state, action) => ({...state, activeBucket: action}))
)
