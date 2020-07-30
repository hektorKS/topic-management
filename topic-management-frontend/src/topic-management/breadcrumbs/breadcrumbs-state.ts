import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Breadcrumb} from "./breadcrumb.model";

export interface BreadcrumbsState {
  breadcrumbs: Breadcrumb[];
}

export const breadcrumbsFeatureKey = 'breadcrumbsKey';
export const breadcrumbsFeatureSelector = createFeatureSelector<BreadcrumbsState>(breadcrumbsFeatureKey);
export const breadcrumbsSelector = createSelector(breadcrumbsFeatureSelector, state => state.breadcrumbs ?? [])

export const initialBreadcrumbsState = {
  breadcrumbs: []
}
