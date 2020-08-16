import {createFeatureSelector, createSelector} from "@ngrx/store";
import {NewMessage} from "./new-message.model";

export interface MessageFormState {
  message: NewMessage;
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
