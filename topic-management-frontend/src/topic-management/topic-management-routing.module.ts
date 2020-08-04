import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SchoolsComponent} from "./schools/schools.component";
import {SchoolComponent} from "./schools/school/school.component";
import {StoreModule} from "@ngrx/store";
import {routerFeatureName} from "./topic-management-router-state";
import {routerReducer} from "@ngrx/router-store";
import {BucketComponent} from "./buckets/bucket/bucket.component";
import {TopicComponent} from "./topics/topic/topic.component";


const routes: Routes = [
  {
    path: 'schools/:schoolId/buckets/:bucketId/topics/:topicId',
    component: TopicComponent,
    pathMatch: 'full'
  },
  {
    path: 'schools/:schoolId/buckets/:bucketId',
    component: BucketComponent,
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
