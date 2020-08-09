import {createReducer, on} from "@ngrx/store";
import {schoolsLoaded} from "./schools/schools-actions";
import {clearTopic, topicLoaded, topicsInBucketLoaded, updateFormTopic} from "./topics/topics-actions";
import {initialState, initialTopicFormState, TopicManagementState} from "./topic-management-state";
import {bucketLoaded, updateBucketsInSchool} from "./buckets/buckets-actions";
import {Topic} from "./topics/topic/topic.model";
import {Bucket, BucketState} from "./buckets/bucket/bucket.model";
import {autocompletionUsernamesLoaded} from "./user/users-actions";
import {bucketFormCancelButtonClicked, newBucketCreated, newBucketInitialized} from "./buckets/bucket/bucket-actions";

export const topicManagementReducer = createReducer<TopicManagementState>(
  initialState,
  on(schoolsLoaded, (state, action) => ({...state, schools: action.schools})),
  on(updateBucketsInSchool, (state, action) => {
    state.schoolBuckets.set(action.schoolId, action.bucketViews);
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
  on(clearTopic, state => ({
    ...state, topicFormState: {...initialTopicFormState}
  })),
  on(autocompletionUsernamesLoaded, (state, action) => ({
    ...state, topicFormState: {
      ...state.topicFormState,
      autocompletionUsers: action.usernameUsers
    }
  })),
  on(newBucketInitialized, newBucketCreated, (state, action) => {
    const schoolId = action.bucketView.schoolId;
    const currentBuckets = state.schoolBuckets.get(schoolId);
    state.schoolBuckets.set(schoolId, [...currentBuckets, action.bucketView]);
    return {...state};
  }),
  on(bucketFormCancelButtonClicked, newBucketCreated, state => {
    state.schoolBuckets.forEach((bucketViews, schoolId, map) => {
        map.set(
          schoolId,
          bucketViews
            .filter(view => view.bucketState !== BucketState.NEW)
            .map(view => view.bucketState == BucketState.EDIT ? {...view, bucketState: BucketState.UNCHANGED} : view)
        )
      }
    )
    return {...state}
  })
)
