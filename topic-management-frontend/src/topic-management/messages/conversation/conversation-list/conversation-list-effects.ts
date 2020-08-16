import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {conversationSelected, conversationsLoaded, loadConversations} from "./conversation-list-actions";
import {exhaustMap, map, withLatestFrom} from "rxjs/operators";
import {currentUserIdSelector} from "../../../topic-management-state";
import {MessagesService} from "../../messages.service";
import {loadMessages} from "../conversation-actions";

@Injectable()
export class ConversationListEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private messageService: MessagesService) {
  }

  loadConversations$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadConversations),
      withLatestFrom(this.store.select(currentUserIdSelector)),
      exhaustMap(([_, currentUserId]) => this.messageService.getConversations(currentUserId)),
      map(conversations => conversationsLoaded({conversations: conversations}))
    );
  });

  conversationSelected$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(conversationSelected),
      map(payload => loadMessages({
        conversationIdentifier: {
          firstUserId: payload.conversation.firstUser.id,
          secondUserId: payload.conversation.secondUser.id
        }
      }))
    );
  });

}
