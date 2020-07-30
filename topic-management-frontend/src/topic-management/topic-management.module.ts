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
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {topicManagementFeatureKey, TopicManagementState} from "./topic-management-state";
import {topicManagementReducer} from "./topics/topics-reducers";
import {breadcrumbsFeatureKey, BreadcrumbsState} from "./breadcrumbs/breadcrumbs-state";
import {breadcrumbsReducer} from "./breadcrumbs/breadcrumbs-reducers";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    TopicManagementComponent,
    TopicManagementMainComponent,
    TopicsComponent,
    BreadcrumbsComponent
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
    StoreModule.forFeature<BreadcrumbsState>(breadcrumbsFeatureKey, breadcrumbsReducer),
    EffectsModule.forRoot([]),
    TopicManagementRoutingModule,
    TopicsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [TopicManagementComponent]
})
export class TopicManagementModule {
}
