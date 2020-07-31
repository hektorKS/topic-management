import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TopicsComponent} from "./topics/topics.component";
import {SchoolsComponent} from "./schools/schools.component";
import {SchoolComponent} from "./schools/school/school.component";


const routes: Routes = [
  {path: '', redirectTo: 'schools', pathMatch: 'full'},
  {
    path: 'schools',
    component: SchoolsComponent
  },
  {
    path: 'schools/:id',
    component: SchoolComponent
  },
  {
    path: 'topics',
    component: TopicsComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class TopicManagementRoutingModule {
}
