import {createAction, props} from "@ngrx/store";
import {Topic} from "./topic/topic.model";

export enum TopicsActions {
  LOAD_TOPICS_IN_BUCKET = '[Topic] Load topics in bucket',
  TOPICS_IN_BUCKET_LOADED = '[Topic] Topics in bucket loaded',
  LOAD_TOPIC = '[Topic] Load topic',
  TOPIC_LOADED = '[Topic] Topic loaded',
  TOPIC_SELECTED = '[Topic] Topic selected',
}

export const loadTopicsInBucket = createAction(TopicsActions.LOAD_TOPICS_IN_BUCKET, props<{ bucketId: string }>());
export const topicsInBucketLoaded = createAction(TopicsActions.TOPICS_IN_BUCKET_LOADED, props<{ topics: Topic[] }>());
export const loadTopic = createAction(TopicsActions.LOAD_TOPIC, props<{ topicId: string }>());
export const topicLoaded = createAction(TopicsActions.TOPIC_LOADED, props<Topic>());
export const topicSelected = createAction(TopicsActions.TOPIC_SELECTED, props<Topic>());

