import {Action, createReducer, on} from "@ngrx/store";
import {AuthenticationState, initialAuthenticationState} from "./authentication-state";
import {signInFormDataChanged} from "./authentication-actions";

const reducer = createReducer<AuthenticationState>(
  initialAuthenticationState,
  on(signInFormDataChanged, (state, action) => ({
    ...state,
    signInData: {
      ...state.signInData,
      ...action.signInData
    }
  }))
);

export function authenticationReducer(state: AuthenticationState = initialAuthenticationState, action: Action): AuthenticationState {
  return reducer(state, action);
}
