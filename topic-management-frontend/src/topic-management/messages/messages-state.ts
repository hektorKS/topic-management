import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Conversation} from "./conversation/conversation.model";
import {Message} from "./message.model";

export interface MessagesState {
  conversations: Conversation[];
  selectedConversationId: number;
  conversationMessages: Map<number, Message[]>;
}

export const messagesKey = 'messagesKey';
export const messagesFeatureSelector = createFeatureSelector<MessagesState>(messagesKey);
export const conversationsSelector = createSelector(messagesFeatureSelector, state => state.conversations);
export const selectedConversationIdSelector = createSelector(messagesFeatureSelector, state => state.selectedConversationId);
export const selectedConversationSelector = createSelector(messagesFeatureSelector, state => state.conversations[state.selectedConversationId]);
export const selectedConversationMessagesSelector = createSelector(
  messagesFeatureSelector,
  state => {
    const messages = state.conversationMessages.get(state.selectedConversationId);
    if (messages !== undefined) {
      return messages.slice().sort((left, right) => left.instant - right.instant)
    }
  }
);


export const initialMessagesState: MessagesState = {
  conversations: [],
  selectedConversationId: undefined,
  conversationMessages: new Map<number, Message[]>()
}
