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


@NgModule({
  declarations: [
    MessageFormComponent
  ],
  exports: [
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(messageFormKey, messageFormReducer),
    EffectsModule.forFeature([MessageFormEffects]),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class MessagesModule {
}
