import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {TopicsEffects} from "./topics-effects";
import {BreadcrumbsEffects} from "../breadcrumbs/breadcrumbs-effects";
import {SchoolsEffects} from "../schools/schools-effects";

const effects = [BreadcrumbsEffects, SchoolsEffects, TopicsEffects];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature(effects)
  ]
})
export class TopicsModule {
}
