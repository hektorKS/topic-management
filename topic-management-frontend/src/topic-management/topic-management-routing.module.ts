import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SchoolsComponent} from "./schools/schools.component";
import {SchoolComponent} from "./schools/school/school.component";
import {StoreModule} from "@ngrx/store";
import {routerFeatureName} from "./topic-management-router-state";
import {routerReducer} from "@ngrx/router-store";
import {TopicComponent} from "./topics/topic/topic.component";
import {NewTopicComponent} from "./topics/topic/new-topic.component";
import {BucketDetailsComponent} from "./buckets/bucket-details/bucket-details.component";
import {SignInComponent} from "./users/authentication/sign-in/sign-in.component";
import {AuthenticationGuard} from "./users/authentication/authentication-guard";
import {ConversationListComponent} from "./messages/conversation/conversation-list/conversation-list.component";


const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'messages',
    component: ConversationListComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'buckets/:bucketId/topics/new-topic',
    component: NewTopicComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'buckets/:bucketId/topics/:topicId',
    component: TopicComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'buckets/:bucketId',
    component: BucketDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'schools/:schoolId',
    component: SchoolComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'schools',
    component: SchoolsComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    redirectTo: 'schools',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreModule.forFeature(routerFeatureName, routerReducer)
  ],
  exports: [RouterModule],
  providers: []
})
export class TopicManagementRoutingModule {
}
