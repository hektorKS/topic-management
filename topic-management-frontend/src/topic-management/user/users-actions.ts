import {createAction, props} from "@ngrx/store";
import {UsernameUser} from "./user.model";

export enum UsersActions {
  SEARCH_AUTOCOMPLETION_USERNAMES = '[User] Search autocompletion usernames',
  AUTOCOMPLETION_USERNAMES_LOADED = '[User] Autocompletion usernames loaded'
}

export const searchAutocompletionUsernames = createAction(UsersActions.SEARCH_AUTOCOMPLETION_USERNAMES, props<{ value: string }>());
export const autocompletionUsernamesLoaded = createAction(UsersActions.AUTOCOMPLETION_USERNAMES_LOADED, props<{ usernameUsers: UsernameUser[] }>());

