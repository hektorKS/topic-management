import {createAction, props} from "@ngrx/store";
import {Breadcrumb} from "./breadcrumb.model";

export enum BreadcrumbsActions {
  CHANGE_BREADCRUMB = '[Breadcrumb] Change breadcrumb',
  BREADCRUMBS_CHANGED = '[Breadcrumb] Breadcrumbs changed',
  BREADCRUMBS_INITIALIZED = '[Breadcrumb] Breadcrumbs initialized',
  BREADCRUMBS_DESTROYED = '[Breadcrumb] Breadcrumbs destroyed',
}

export const changeBreadcrumb = createAction(BreadcrumbsActions.CHANGE_BREADCRUMB, props<{ name: string, url: string }>());
export const breadcrumbsChanged = createAction(BreadcrumbsActions.BREADCRUMBS_CHANGED, props<{ breadcrumbs: Breadcrumb[] }>());
export const breadcrumbsInitialized = createAction(BreadcrumbsActions.BREADCRUMBS_INITIALIZED);
export const breadcrumbsDestroyed = createAction(BreadcrumbsActions.BREADCRUMBS_DESTROYED, props<{ breadcrumbs: Breadcrumb[] }>());
