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


const routes: Routes = [
  {
    path: 'buckets/:bucketId/topics/new-topic',
    component: NewTopicComponent,
    pathMatch: 'full'
  },
  {
    path: 'buckets/:bucketId/topics/:topicId',
    component: TopicComponent,
    pathMatch: 'full'
  },
  {
    path: 'buckets/:bucketId',
    component: BucketDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'schools/:schoolId',
    component: SchoolComponent,
    pathMatch: 'full'
  },
  {
    path: 'schools',
    component: SchoolsComponent,
    pathMatch: 'full'
  },
  {path: '', redirectTo: 'schools', pathMatch: 'full'}
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
