import {getSelectors, RouterReducerState} from '@ngrx/router-store';
import {createFeatureSelector} from '@ngrx/store';

export interface State {
  router: RouterReducerState;
}

export const routerFeatureName = 'router';
export const selectRouter = createFeatureSelector<State, RouterReducerState>(routerFeatureName);
export const {
  selectRouteParam,
} = getSelectors(selectRouter);
export const selectSchoolId = selectRouteParam('schoolId');
export const selectBucketId = selectRouteParam('bucketId');
export const selectTopicId = selectRouteParam('topicId');

