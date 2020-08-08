import {createAction, props} from "@ngrx/store";
import {Topic} from "./topic/topic.model";

export enum TopicsActions {
  LOAD_TOPICS_IN_BUCKET = '[Topic] Load topics in bucket',
  TOPICS_IN_BUCKET_LOADED = '[Topic] Topics in bucket loaded',
  NEW_TOPIC_BUTTON_SELECTED = '[Topic] New topic button selected',
  INIT_NEW_TOPIC = '[Topic] Init new topic',
  CANCEL_NEW_TOPIC = '[Topic] Cancel new topic',
  SAVE_NEW_TOPIC = '[Topic] Save new topic',
  NEW_TOPIC_SAVED = '[Topic] New topic saved',
  LOAD_TOPIC = '[Topic] Load topic',
  TOPIC_LOADED = '[Topic] Topic loaded',
  UPDATE_TOPIC = '[Topic] Update topic',
  TOPIC_UPDATED = '[Topic] Topic updated',
  DELETE_TOPIC = '[Topic] Delete topic',
  TOPIC_DELETED = '[Topic] Topic deleted',
  CLEAR_TOPIC = '[Topic] Clear form topic',
  UPDATE_FORM_TOPIC = '[Topic] Update form topic',
  TOPIC_SELECTED = '[Topic] Topic selected',
}

export const newTopicButtonSelected = createAction(TopicsActions.NEW_TOPIC_BUTTON_SELECTED);
export const initNewTopic = createAction(TopicsActions.INIT_NEW_TOPIC);
export const cancelNewTopic = createAction(TopicsActions.CANCEL_NEW_TOPIC);
export const saveNewTopic = createAction(TopicsActions.SAVE_NEW_TOPIC, props<Topic>());
export const newTopicSaved = createAction(TopicsActions.NEW_TOPIC_SAVED);
export const loadTopic = createAction(TopicsActions.LOAD_TOPIC, props<{ topicId: string }>());
export const topicLoaded = createAction(TopicsActions.TOPIC_LOADED, props<Topic>());
export const updateTopic = createAction(TopicsActions.UPDATE_TOPIC, props<Topic>());
export const topicUpdated = createAction(TopicsActions.TOPIC_UPDATED, props<{ topicId: string }>());
export const deleteTopic = createAction(TopicsActions.DELETE_TOPIC, props<{ topicId: string }>());
export const topicDeleted = createAction(TopicsActions.TOPIC_DELETED, props<{ topicId: string }>());
export const clearTopic = createAction(TopicsActions.CLEAR_TOPIC);
export const loadTopicsInBucket = createAction(TopicsActions.LOAD_TOPICS_IN_BUCKET, props<{ bucketId: string }>());
export const topicsInBucketLoaded = createAction(TopicsActions.TOPICS_IN_BUCKET_LOADED, props<{ bucketId: string, topics: Topic[] }>());
export const updateFormTopic = createAction(TopicsActions.UPDATE_FORM_TOPIC, props<Partial<Topic>>());
export const topicSelected = createAction(TopicsActions.TOPIC_SELECTED, props<Topic>());

