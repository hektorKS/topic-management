import {Action, createReducer, on} from "@ngrx/store";
import {BreadcrumbsState, initialBreadcrumbsState} from "./breadcrumbs-state";
import {breadcrumbsChanged} from "./breadcrumbs-actions";

const reducer = createReducer<BreadcrumbsState>(
  initialBreadcrumbsState,
  on(breadcrumbsChanged, (state, action) => ({...state, breadcrumbs: action.breadcrumbs}))
);

export function breadcrumbsReducer(state: BreadcrumbsState = initialBreadcrumbsState, action: Action): BreadcrumbsState {
  return reducer(state, action);
}
