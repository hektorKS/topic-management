import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MessagesService} from "../messages.service";
import {Observable} from "rxjs";
import {loadMessages, messagesLoaded} from "./message-list-actions";
import {exhaustMap, filter, map, withLatestFrom} from "rxjs/operators";
import {messageSent} from "../message-form/message-form-actions";
import {selectedConversationIdSelector, selectedConversationSelector} from "../messages-state";

@Injectable()
export class MessageListEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private messageService: MessagesService) {
  }


  loadMessages$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMessages),
      exhaustMap(payload => this.messageService.getMessages(payload.conversationIdentifier)
        .pipe(map(messages => ({
          messages: messages,
          index: payload.index
        })))
      ),
      map(payload => messagesLoaded(payload))
    );
  });

  // #NiceToHave verify url
  messageSent$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(messageSent),
      withLatestFrom(
        this.store.select(selectedConversationIdSelector).pipe(filter(_ => _ !== undefined)),
        this.store.select(selectedConversationSelector).pipe(filter(_ => _ !== undefined))
      ),
      map(([_, index, conversation]) => {
        return loadMessages({
          index: index,
          conversationIdentifier: {
            firstUserId: conversation.firstUser.id,
            secondUserId: conversation.secondUser.id
          }
        })
      })
    );
  });

}
