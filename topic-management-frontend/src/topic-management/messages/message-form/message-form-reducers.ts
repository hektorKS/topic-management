import {Action, createReducer, on} from "@ngrx/store";
import {initialMessageFormState, MessageFormState} from "./message-form-state";
import {messageValueChanged} from "./message-form-actions";

const reducer = createReducer<MessageFormState>(
  initialMessageFormState,
  on(messageValueChanged, (state, action) => ({
    ...state,
    message: {
      ...state.message,
      ...action.message
    }
  }))
);

export function messageFormReducer(state: MessageFormState = initialMessageFormState, action: Action): MessageFormState {
  return reducer(state, action);
}

