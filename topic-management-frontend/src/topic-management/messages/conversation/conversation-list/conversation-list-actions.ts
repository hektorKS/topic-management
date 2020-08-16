import {createAction, props} from "@ngrx/store";
import {Conversation} from "../conversation.model";

export enum ConversationListActions {
  CONVERSATION_LIST_OPENED = '[Conversation list] Conversation list opened',
  LOAD_CONVERSATIONS = '[Conversation list] Load conversations',
  CONVERSATIONS_LOADED = '[Conversation list] Conversations loaded',
  CONVERSATION_SELECTED = '[Conversation list] Conversation selected'
}

export const conversationListOpened = createAction(ConversationListActions.CONVERSATION_LIST_OPENED);
export const loadConversations = createAction(ConversationListActions.LOAD_CONVERSATIONS);
export const conversationsLoaded = createAction(ConversationListActions.CONVERSATIONS_LOADED, props<{ conversations: Conversation[] }>());
export const conversationSelected = createAction(ConversationListActions.CONVERSATION_SELECTED, props<{ conversation: Conversation, index: number }>());
