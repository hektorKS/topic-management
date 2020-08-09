import {createReducer, on} from "@ngrx/store";
import {initialMessageFormState, MessageFormState} from "./message-form-state";
import {messageValueChanged} from "./message-form-actions";

export const messageFormReducer = createReducer<MessageFormState>(
  initialMessageFormState,
  on(messageValueChanged, (state, action) => ({
    ...state,
    message: {
      ...state.message,
      ...action.message
    }
  }))
);

