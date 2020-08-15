import {createReducer, on} from "@ngrx/store";
import {AuthenticationState, initialAuthenticationState} from "./authentication-state";
import {signInFormDataChanged} from "./authentication-actions";

export const authenticationReducer = createReducer<AuthenticationState>(
  initialAuthenticationState,
  on(signInFormDataChanged, (state, action) => ({
    ...state,
    signInData: {
      ...state.signInData,
      ...action.signInData
    }
  }))
);

