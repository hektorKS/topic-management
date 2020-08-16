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


@NgModule({
  declarations: [
    MessageFormComponent,
    ConversationListComponent
  ],
  exports: [
    MessageFormComponent,
    ConversationListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(messageFormKey, messageFormReducer),
    StoreModule.forFeature(messagesKey, messagesReducer),
    EffectsModule.forFeature([
      MessageFormEffects,
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
