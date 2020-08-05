import {createAction, props} from "@ngrx/store";
import {Topic} from "./topic/topic.model";

export enum TopicsActions {
  LOAD_TOPICS_IN_BUCKET = '[Topic] Load topics in bucket',
  CLEAR_TOPICS_IN_BUCKET = '[Topic] Clear topics state',
  TOPICS_IN_BUCKET_LOADED = '[Topic] Topics in bucket loaded',
  LOAD_TOPIC = '[Topic] Load topic',
  TOPIC_LOADED = '[Topic] Topic loaded',
  SAVE_TOPIC = '[Topic] Save topic',
  TOPIC_SAVED = '[Topic] Topic saved',
  DELETE_TOPIC = '[Topic] Delete topic',
  TOPIC_DELETED = '[Topic] Topic deleted',
  UPDATE_FORM_TOPIC = '[Topic] Update form topic',
  TOPIC_SELECTED = '[Topic] Topic selected',
}

export const loadTopic = createAction(TopicsActions.LOAD_TOPIC, props<{ topicId: string }>());
export const topicLoaded = createAction(TopicsActions.TOPIC_LOADED, props<Topic>());
export const saveTopic = createAction(TopicsActions.SAVE_TOPIC, props<Topic>());
export const topicSaved = createAction(TopicsActions.TOPIC_SAVED, props<{ topicId: string }>());
export const deleteTopic = createAction(TopicsActions.DELETE_TOPIC, props<{ topicId: string }>());
export const topicDeleted = createAction(TopicsActions.TOPIC_DELETED, props<{ topicId: string }>());
export const loadTopicsInBucket = createAction(TopicsActions.LOAD_TOPICS_IN_BUCKET, props<{ bucketId: string }>());
export const topicsInBucketLoaded = createAction(TopicsActions.TOPICS_IN_BUCKET_LOADED, props<{ bucketId: string, topics: Topic[] }>());
export const updateFormTopic = createAction(TopicsActions.UPDATE_FORM_TOPIC, props<Partial<Topic>>());
export const topicSelected = createAction(TopicsActions.TOPIC_SELECTED, props<Topic>());

