import {Action, createReducer, on} from "@ngrx/store";
import {initialMessagesState, MessagesState} from "./messages-state";
import {conversationSelected, conversationsLoaded} from "./conversation/conversation-list/conversation-list-actions";
import {messagesLoaded} from "./message-list/message-list-actions";

const reducer = createReducer<MessagesState>(
  initialMessagesState,
  on(conversationsLoaded, (store, action) => ({
    ...store,
    conversations: action.conversations
  })),
  on(conversationSelected, (state, action) => ({
    ...state,
    selectedConversationId: action.index
  })),
  on(messagesLoaded, (state, action) => {
      state.conversationMessages.set(action.index, action.messages);
      return {...state};
    }
  )
);

export function messagesReducer(state: MessagesState = initialMessagesState, action: Action): MessagesState {
  return reducer(state, action);
}

