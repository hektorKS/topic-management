import {createAction, props} from "@ngrx/store";
import {School} from "./school/school.model";

export enum SchoolsActions {
  SCHOOLS_VIEW_OPENED = '[School] School view opened',
  SCHOOLS_LOADED = '[School] Schools loaded',
  SCHOOL_SELECTED = '[School] Schools selected',
}

export const schoolsViewOpened = createAction(SchoolsActions.SCHOOLS_VIEW_OPENED);
export const schoolsLoaded = createAction(SchoolsActions.SCHOOLS_LOADED, props<{ schools: School[] }>());
export const schoolSelected = createAction(SchoolsActions.SCHOOL_SELECTED, props<School>());

