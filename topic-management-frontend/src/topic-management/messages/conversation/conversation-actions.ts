import {createAction, props} from "@ngrx/store";
import {ConversationIdentifier} from "./conversation.model";

export enum ConversationActions {
  LOAD_MESSAGES = '[Conversation] Load messages'
}

export const loadMessages = createAction(ConversationActions.LOAD_MESSAGES, props<{ conversationIdentifier: ConversationIdentifier }>());
