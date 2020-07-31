import {createAction, props} from "@ngrx/store";
import {Breadcrumb} from "./breadcrumb.model";

export enum BreadcrumbsActions {
  CHANGE_BREADCRUMB = '[Breadcrumb] Change breadcrumb',
  BREADCRUMBS_CHANGED = '[Breadcrumb] Breadcrumbs changed',
  BREADCRUMBS_SELECTED = '[Breadcrumb] Breadcrumbs selected',
}

export const changeBreadcrumb = createAction(BreadcrumbsActions.CHANGE_BREADCRUMB, props<{ name: string }>());
export const breadcrumbsChanged = createAction(BreadcrumbsActions.BREADCRUMBS_CHANGED, props<{ breadcrumbs: Breadcrumb[] }>());
export const breadcrumbSelected = createAction(BreadcrumbsActions.BREADCRUMBS_SELECTED, props<Breadcrumb>());
