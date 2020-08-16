import {createAction, props} from "@ngrx/store";
import {ConversationIdentifier} from "../conversation/conversation.model";
import {Message} from "../message.model";

export enum MessageListActions {
  LOAD_MESSAGES = '[Message list] Load messages',
  MESSAGES_LOADED = '[Message list] Messages loaded'
}

export const loadMessages = createAction(MessageListActions.LOAD_MESSAGES, props<{ index: number, conversationIdentifier: ConversationIdentifier }>());
export const messagesLoaded = createAction(MessageListActions.MESSAGES_LOADED, props<{ index: number, messages: Message[] }>());
