import {createAction, props} from "@ngrx/store";
import {Message} from "../message.model";

export enum MessageFormActions {
  SUBMIT_NEW_MESSAGE_BUTTON_CLICKED = '[Message form] Submit new message button clicked',
  MESSAGE_VALUE_CHANGED = '[Message form] Message value changed',
  MESSAGE_SENT = '[Message form] Message sent'
}

export const messageValueChanged = createAction(MessageFormActions.MESSAGE_VALUE_CHANGED, props<{ message: Partial<Message> }>());
export const messageSent = createAction(MessageFormActions.MESSAGE_SENT);
export const submitNewMessageButtonClicked = createAction(MessageFormActions.SUBMIT_NEW_MESSAGE_BUTTON_CLICKED, props<{ recipientId: string }>());
