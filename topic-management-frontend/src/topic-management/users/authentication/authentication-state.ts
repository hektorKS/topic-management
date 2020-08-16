import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SignInData} from "./sign-in/sign-in.component";

export interface AuthenticationState {
  signInData: SignInData;
}

export const authenticationKey = 'authenticationKey';
export const authenticationFeatureSelector = createFeatureSelector<AuthenticationState>(authenticationKey);
export const signInDataSelector = createSelector(authenticationFeatureSelector, state => state.signInData)

export const initialAuthenticationState: AuthenticationState = {
  signInData: {
    username: '',
    password: ''
  }
}
