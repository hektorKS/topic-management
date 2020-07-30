import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {topicManagementReducer} from "./topics-reducers";
import {topicManagementFeatureKey, TopicManagementState} from "../topic-management-state";
import {TopicsEffects} from "./topics-effects";
import {BreadcrumbsEffects} from "../breadcrumbs/breadcrumbs-effects";

const effects = [BreadcrumbsEffects, TopicsEffects];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature<TopicManagementState>(topicManagementFeatureKey, topicManagementReducer),
    EffectsModule.forFeature(effects)
  ]
})
export class TopicsModule {
}
