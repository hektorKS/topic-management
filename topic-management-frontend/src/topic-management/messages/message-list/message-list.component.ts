import {Component, OnInit} from "@angular/core";
import {combineLatest, Observable} from "rxjs";
import {Message} from "../message.model";
import {Store} from "@ngrx/store";
import {selectedConversationMessagesSelector, selectedConversationSelector} from "../messages-state";
import {filter, map} from "rxjs/operators";
import {currentUserIdSelector} from "../../topic-management-state";

@Component({
  selector: 'message-list',
  template: `
    <div class="message-list-content-wrapper">
      <div *ngFor="let message of messages$ | async" [ngClass]="{
      'current-user-is-sender': (currentUserId$ | async) === message.senderId,
      'other-user-is-sender': (currentUserId$ | async) !== message.senderId
      }" class="message">
        {{ message.message }}
      </div>
    </div>
    <message-form *ngIf="(messages$ | async).length !== 0"  [recipientId]="getRecipientId() | async"></message-form>
  `,
  styleUrls: ['message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  messages$: Observable<Message[]>;
  currentUserId$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.messages$ = this.store.select(selectedConversationMessagesSelector);
    this.currentUserId$ = this.store.select(currentUserIdSelector);
  }

  getRecipientId(): Observable<string> {
    return combineLatest([
      this.store.select(selectedConversationSelector).pipe(filter(_ => _ !== undefined)),
      this.currentUserId$
    ]).pipe(
      map(([conversation, currentUserId]) => {
        if (conversation.firstUser.id === currentUserId) {
          return conversation.secondUser.id;
        } else {
          return conversation.firstUser.id;
        }
      })
    );
  }

}
