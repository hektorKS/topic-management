import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TopicManagementMainComponent} from "./topic-management-main.component";


const routes: Routes = [
  {path: '', redirectTo: '/topics', pathMatch: 'full'},
  {
    path: 'topics',
    component: TopicManagementMainComponent
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
