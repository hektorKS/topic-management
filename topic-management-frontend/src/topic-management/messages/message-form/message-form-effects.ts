import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {messageSent, submitNewMessageButtonClicked} from "./message-form-actions";
import {exhaustMap, map, withLatestFrom} from "rxjs/operators";
import {newMessageSelector} from "./message-form-state";
import {MessagesService} from "../messages.service";
import {currentUserIdSelector} from "../../topic-management-state";

@Injectable()
export class MessageFormEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private messageService: MessagesService) {
  }

  submitNewMessageButtonClicked$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(submitNewMessageButtonClicked),
      withLatestFrom(this.store.select(newMessageSelector), this.store.select(currentUserIdSelector)),
      exhaustMap(([payload, message, currentUserId]) => this.messageService.sendMessage({
        ...message,
        senderId: currentUserId,
        recipientId: payload.recipientId
      })),
      map(messageSent)
    );
  });

}
