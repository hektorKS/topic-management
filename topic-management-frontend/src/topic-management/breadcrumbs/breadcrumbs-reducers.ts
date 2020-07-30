import {createReducer, on} from "@ngrx/store";
import {BreadcrumbsState, initialBreadcrumbsState} from "./breadcrumbs-state";
import {breadcrumbsChanged} from "./breadcrumbs-actions";

export const breadcrumbsReducer = createReducer<BreadcrumbsState>(
  initialBreadcrumbsState,
  on(breadcrumbsChanged, (state, action) => ({...state, breadcrumbs: action.breadcrumbs}))
);

