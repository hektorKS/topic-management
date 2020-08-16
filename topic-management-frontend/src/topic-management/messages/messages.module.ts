import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {messageFormKey} from "./message-form/message-form-state";
import {messageFormReducer} from "./message-form/message-form-reducers";
import {MessageFormEffects} from "./message-form/message-form-effects";
import {MessageFormComponent} from "./message-form/message-form.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {messagesKey} from "./messages-state";
import {messagesReducer} from "./messages-reducers";
import {ConversationListComponent} from "./conversation/conversation-list/conversation-list.component";
import {ConversationListEffects} from "./conversation/conversation-list/conversation-list-effects";
import {ConversationViewComponent} from "./conversation/conversation-view.component";
import {MessageListEffects} from "./message-list/message-list-effects";
import {MessageListComponent} from "./message-list/message-list.component";


@NgModule({
  declarations: [
    MessageFormComponent,
    MessageListComponent,
    ConversationViewComponent,
    ConversationListComponent
  ],
  exports: [
    MessageFormComponent,
    MessageListComponent,
    ConversationViewComponent,
    ConversationListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(messageFormKey, messageFormReducer),
    StoreModule.forFeature(messagesKey, messagesReducer),
    EffectsModule.forFeature([
      MessageFormEffects,
      MessageListEffects,
      ConversationListEffects
    ]),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule
  ]
})
export class MessagesModule {
}
