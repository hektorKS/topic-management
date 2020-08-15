import {createAction, props} from "@ngrx/store";
import {SignedInUser, User} from "../user.model";
import {SignInData} from "./sign-in/sign-in.component";

export enum AuthenticationActions {
  SIGN_IN_FORM_DATA_CHANGED = '[Authentication] Sign in form data changed',
  SIGN_IN_BUTTON_CLICKED = '[Authentication] Sign in button clicked',
  SIGN_IN_FAILED = '[Authentication] Sign in failed',
  SIGNED_IN = '[Authentication] Signed in',
  SIGNED_OUT = '[Authentication] Signed out',
  LOAD_SIGNED_IN_USER = '[Authentication] Load signed in user'
}

export const signInFormDataChanged = createAction(AuthenticationActions.SIGN_IN_FORM_DATA_CHANGED, props<{ signInData: Partial<SignInData> }>());
export const signInButtonClicked = createAction(AuthenticationActions.SIGN_IN_BUTTON_CLICKED);
export const signInFailed = createAction(AuthenticationActions.SIGN_IN_FAILED);
export const signedIn = createAction(AuthenticationActions.SIGNED_IN, props<SignedInUser>());
export const signedOut = createAction(AuthenticationActions.SIGNED_OUT);
export const loadSignedInUser = createAction(AuthenticationActions.LOAD_SIGNED_IN_USER, props<SignedInUser>());
