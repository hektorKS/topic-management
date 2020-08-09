import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {TopicManagementComponent} from './topic-management.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Store, StoreModule} from "@ngrx/store";
import {TopicManagementRootState} from "./topic-management-root-state";
import {TopicListComponent} from "./topics/topic-list.component";
import {EffectsModule} from "@ngrx/effects";
import {HttpClientModule} from "@angular/common/http";
import {TopicManagementMainComponent} from "./topic-management-main.component";
import {TopicManagementRoutingModule} from "./topic-management-routing.module";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {breadcrumbsFeatureKey, BreadcrumbsState} from "./breadcrumbs/breadcrumbs-state";
import {breadcrumbsReducer} from "./breadcrumbs/breadcrumbs-reducers";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {SchoolsComponent} from "./schools/schools.component";
import {MatListModule} from "@angular/material/list";
import {SchoolComponent} from "./schools/school/school.component";
import {topicManagementFeatureKey, TopicManagementState} from "./topic-management-state";
import {topicManagementReducer} from "./topic-management-reducers";
import {MatMenuModule} from "@angular/material/menu";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TopicComponent} from "./topics/topic/topic.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StudentFormPanelComponent} from "./topics/topic/student-form-panel.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {BreadcrumbsEffects} from "./breadcrumbs/breadcrumbs-effects";
import {SchoolsEffects} from "./schools/schools-effects";
import {BucketsEffects} from "./buckets/buckets-effects";
import {TopicsEffects} from "./topics/topics-effects";
import {UsersEffects} from "./user/users-effects";
import {CommonModule} from "@angular/common";
import {TopicFormComponent} from "./topics/topic/form/topic-form.component";
import {NewTopicComponent} from "./topics/topic/new-topic.component";
import {BucketFormComponent} from "./buckets/bucket-form/bucket-form.component";
import {BucketViewOptionComponent} from "./buckets/bucket-list/bucket-view-option.component";
import {BucketListComponent} from "./buckets/bucket-list/bucket-list.component";
import {BucketFormOptionComponent} from "./buckets/bucket-list/bucket-form-option.component";
import {topicManagementApplicationInitialized} from "./topic-management-actions";
import {BucketState, newBucketKey} from "./buckets/bucket/bucket-state";
import {bucketReducer} from "./buckets/bucket/bucket-reducers";
import {BucketEffects} from "./buckets/bucket/bucket-effects";
import {BucketDetailsComponent} from "./buckets/bucket-details/bucket-details.component";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

const effects = [BreadcrumbsEffects, SchoolsEffects, BucketsEffects, BucketEffects, TopicsEffects, UsersEffects];

function dispatchAppInitialized(store: Store): () => Promise<void> {
  return () => {
    if (store) {
      store.dispatch(topicManagementApplicationInitialized());
      return Promise.resolve();
    } else {
      return Promise.reject('Application did not initialize properly');
    }
  };
}

@NgModule({
  declarations: [
    TopicManagementComponent,
    TopicManagementMainComponent,
    SchoolsComponent,
    SchoolComponent,
    BucketListComponent,
    BucketViewOptionComponent,
    BucketFormOptionComponent,
    BucketFormComponent,
    BucketDetailsComponent,
    TopicListComponent,
    TopicComponent,
    NewTopicComponent,
    TopicFormComponent,
    BreadcrumbsComponent,
    StudentFormPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot<TopicManagementRootState>({
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreModule.forFeature<TopicManagementState>(topicManagementFeatureKey, topicManagementReducer),
    StoreModule.forFeature<BreadcrumbsState>(breadcrumbsFeatureKey, breadcrumbsReducer),
    StoreModule.forFeature<BucketState>(newBucketKey, bucketReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TopicManagementRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: dispatchAppInitialized, deps: [Store], multi: true}
  ],
  bootstrap: [TopicManagementComponent]
})
export class TopicManagementModule {
}
