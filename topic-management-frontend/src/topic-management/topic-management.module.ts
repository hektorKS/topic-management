import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {TopicManagementComponent} from './topic-management.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from "@ngrx/store";
import {TopicManagementRootState} from "./topic-management-root-state";
import {TopicsModule} from "./topics/topics.module";
import {TopicsComponent} from "./topics/topics.component";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {TopicManagementMainComponent} from "./topic-management-main.component";
import {TopicManagementRoutingModule} from "./topic-management-routing.module";

@NgModule({
  declarations: [
    TopicManagementComponent,
    TopicManagementMainComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<TopicManagementRootState>({
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([]),
    TopicManagementRoutingModule,
    TopicsModule
  ],
  providers: [],
  bootstrap: [TopicManagementComponent]
})
export class TopicManagementModule {
}
