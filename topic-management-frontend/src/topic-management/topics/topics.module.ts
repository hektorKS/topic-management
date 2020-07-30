import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {reducer} from "./topics-reducers";
import {topicManagementFeatureKey, TopicManagementState} from "../topic-management-state";
import {TopicsEffects} from "./topics-effects";

const effects = [TopicsEffects];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature<TopicManagementState>(topicManagementFeatureKey, reducer),
    EffectsModule.forFeature(effects)
  ]
})
export class TopicsModule {
}
