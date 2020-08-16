import {createReducer, on} from "@ngrx/store";
import {initialMessagesState, MessagesState} from "./messages-state";
import {conversationsLoaded} from "./conversation/conversation-list/conversation-list-actions";

export const messagesReducer = createReducer<MessagesState>(
  initialMessagesState,
  on(conversationsLoaded, (store, action) => ({
    ...store,
    conversations: action.conversations
  }))
);

