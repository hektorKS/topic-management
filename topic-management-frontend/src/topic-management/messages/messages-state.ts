import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Conversation} from "./conversation/conversation.model";

export interface MessagesState {
  conversations: Conversation[];
}

export const messagesKey = 'messagesKey';
export const messagesFeatureSelector = createFeatureSelector<MessagesState>(messagesKey);
export const conversationsSelector = createSelector(messagesFeatureSelector, state => state.conversations)

export const initialMessagesState: MessagesState = {
  conversations: []
}
