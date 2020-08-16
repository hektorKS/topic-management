import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {debounceTime, map, switchMap} from "rxjs/operators";
import {UsersService} from "./users.service";
import {autocompletionUsernamesLoaded, searchAutocompletionUsernames} from "./users-actions";

@Injectable()
export class UsersEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private usersService: UsersService) {
  }

  searchAutocompletionUsernames$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchAutocompletionUsernames),
      debounceTime(50),
      switchMap(payload => this.usersService.searchUsernames(payload.value)),
      map(payload => autocompletionUsernamesLoaded({usernameUsers: payload}))
    );
  });

}
