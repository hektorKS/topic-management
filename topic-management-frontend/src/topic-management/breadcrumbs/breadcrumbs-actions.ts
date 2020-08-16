import {createAction, props} from "@ngrx/store";
import {Breadcrumb} from "./breadcrumb.model";

export enum BreadcrumbsActions {
  CHANGE_BREADCRUMB = '[Breadcrumb] Change breadcrumb',
  START_BREADCRUMB_PATH = '[Breadcrumb] Start breadcrumb path',
  BREADCRUMBS_CHANGED = '[Breadcrumb] Breadcrumbs changed',
  BREADCRUMBS_INITIALIZED = '[Breadcrumb] Breadcrumbs initialized',
  BREADCRUMBS_DESTROYED = '[Breadcrumb] Breadcrumbs destroyed',
  POP_BREADCRUMB = '[Breadcrumb] Pop breadcrumb',
}

export const changeBreadcrumb = createAction(BreadcrumbsActions.CHANGE_BREADCRUMB, props<{ name: string, url: string }>());
export const startBreadcrumbPath = createAction(BreadcrumbsActions.START_BREADCRUMB_PATH, props<{ name: string, url: string }>());
export const breadcrumbsChanged = createAction(BreadcrumbsActions.BREADCRUMBS_CHANGED, props<{ breadcrumbs: Breadcrumb[] }>());
export const breadcrumbsInitialized = createAction(BreadcrumbsActions.BREADCRUMBS_INITIALIZED);
export const breadcrumbsDestroyed = createAction(BreadcrumbsActions.BREADCRUMBS_DESTROYED, props<{ breadcrumbs: Breadcrumb[] }>());
export const popBreadcrumb = createAction(BreadcrumbsActions.POP_BREADCRUMB);
