import {createAction, props} from "@ngrx/store";
import {Topic} from "./topic/topic.model";

export enum TopicsActions {
  TOPICS_VIEW_OPENED = '[Topic] Topic view opened',
  TOPICS_LOADED = '[Topic] Topics loaded',
}

export const topicsViewOpened = createAction(TopicsActions.TOPICS_VIEW_OPENED);
export const topicsLoaded = createAction(TopicsActions.TOPICS_LOADED, props<{ topics: Topic[] }>());

