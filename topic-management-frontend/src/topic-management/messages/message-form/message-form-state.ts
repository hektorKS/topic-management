import {Message} from "../message.model";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface MessageFormState {
  message: Message;
}

export const messageFormKey = 'messageFormKey';
export const messageFormFeatureSelector = createFeatureSelector<MessageFormState>(messageFormKey);
export const newMessageSelector = createSelector(messageFormFeatureSelector, state => state.message)

export const initialMessageFormState: MessageFormState = {
  message: {
    message: '',
    senderId: undefined,
    recipientId: undefined
  }
}
