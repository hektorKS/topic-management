import {createAction} from "@ngrx/store";

export enum TopicManagementActions {
  APPLICATION_INITIALIZED = '[Topic management] Application initialized'
}

export const topicManagementApplicationInitialized = createAction(TopicManagementActions.APPLICATION_INITIALIZED);
