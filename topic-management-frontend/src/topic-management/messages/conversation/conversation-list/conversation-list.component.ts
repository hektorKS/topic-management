import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {conversationListOpened, conversationSelected, loadConversations} from "./conversation-list-actions";
import {Conversation} from "../conversation.model";
import {conversationsSelector} from "../../messages-state";
import {currentUserIdSelector} from "../../../topic-management-state";
import {NameUser} from "../../../users/user.model";
import {filter, first, map} from "rxjs/operators";

@Component({
  selector: 'conversation-list',
  template: `
    <mat-selection-list #conversations [multiple]="false">
      <mat-list-option *ngFor="let conversation of conversations$ | async; let i = index"
                       [value]="conversation"
                       (click)="conversationSelected(conversation, i)">
        <div class="conversation-option-wrapper">
          <span class="person-icon icon-medium"></span>
          <div class="conversation-details-wrapper">
            <div class="conversation-header">
              <div *ngIf="getRecipient(conversation) | async; let user" class="conversation-recipient">
                {{user.firstName + ' ' + user.lastName}}
              </div>
              <div class="conversation-last-message-date">
                {{conversation.lastMessageInstant | date: 'MMMM, dd HH:mm'}}
              </div>
            </div>
            <div class="conversation-last-message"> {{conversation.lastMessage}} </div>
          </div>
        </div>
      </mat-list-option>
    </mat-selection-list>
  `,
  styleUrls: ['conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListComponent implements OnInit {

  @Input() bucketId: string;

  conversations$: Observable<Conversation[]>;
  currentUserId$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadConversations());
    this.store.dispatch(conversationListOpened());
    this.conversations$ = this.store.pipe(select(conversationsSelector));
    this.currentUserId$ = this.store.pipe(select(currentUserIdSelector));
    this.conversations$.pipe(filter(_ => _.length !== 0), first()).subscribe(conversations => {
      // Select first conversation after list loaded
      if (conversations.length > 0) {
        this.store.dispatch(conversationSelected({index: 0, conversation: conversations[0]}));
      }
    });
  }

  conversationSelected(conversation: Conversation, index: number): void {
    this.store.dispatch(conversationSelected({index: index, conversation: conversation}));
  }

  getRecipient(conversation: Conversation): Observable<NameUser> {
    return this.currentUserId$.pipe(
      map(currentUserId => {
        if (conversation.firstUser.id === currentUserId) {
          return conversation.secondUser;
        } else {
          return conversation.firstUser;
        }
      })
    );
  }

}
