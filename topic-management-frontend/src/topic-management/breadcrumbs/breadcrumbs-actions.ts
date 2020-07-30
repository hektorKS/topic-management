import {createAction, props} from "@ngrx/store";
import {Breadcrumb} from "./breadcrumb.model";

export enum BreadcrumbsActions {
  CHANGE_BREADCRUMB = '[Breadcrumb] Change breadcrumb',
  BREADCRUMBS_CHANGED = '[Breadcrumb] Breadcrumbs changed',
}

export const changeBreadcrumb = createAction(BreadcrumbsActions.CHANGE_BREADCRUMB, props<Breadcrumb>());
export const breadcrumbsChanged = createAction(BreadcrumbsActions.BREADCRUMBS_CHANGED, props<{ breadcrumbs: Breadcrumb[] }>());
