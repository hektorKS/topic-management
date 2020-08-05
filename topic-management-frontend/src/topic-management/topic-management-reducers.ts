import {createReducer, on} from "@ngrx/store";
import {schoolsLoaded} from "./schools/schools-actions";
import {clearFormTopic, topicLoaded, topicsInBucketLoaded, updateFormTopic} from "./topics/topics-actions";
import {initialState, initialTopicFormState, TopicManagementState} from "./topic-management-state";
import {bucketLoaded, bucketsInSchoolLoaded} from "./buckets/buckets-actions";
import {Topic} from "./topics/topic/topic.model";
import {Bucket} from "./buckets/bucket/bucket.model";
import {autocompletionUsernamesLoaded} from "./user/users-actions";

export const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(schoolsLoaded, (state, action) => ({...state, schools: action.schools})),
  on(bucketsInSchoolLoaded, (state, action) => {
    state.schoolBuckets.set(action.schoolId, action.buckets);
    return {...state};
  }),
  on(bucketLoaded, (state, action: Bucket) => ({...state, activeBucket: action})),
  on(topicsInBucketLoaded, (state, action) => {
    state.bucketTopics.set(action.bucketId, action.topics);
    return {...state};
  }),
  on(topicLoaded, (state, action: Topic) => ({
    ...state, topicFormState: {
      ...state.topicFormState,
      originalTopic: action,
      topic: action
    }
  })),
  on(updateFormTopic, (state, action: Partial<Topic>) => ({
    ...state, topicFormState: {
      ...state.topicFormState,
      topic: {
        ...state.topicFormState.topic,
        ...action
      }
    }
  })),
  on(clearFormTopic, state => ({
    ...state, topicFormState: {...initialTopicFormState}
  })),
  on(autocompletionUsernamesLoaded, (state, action) => ({
    ...state, topicFormState: {
      ...state.topicFormState,
      autocompletionUsers: action.usernameUsers
    }
  }))
)
