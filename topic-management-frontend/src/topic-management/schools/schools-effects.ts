import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {exhaustMap, map, tap} from "rxjs/operators";
import {changeBreadcrumb} from "../breadcrumbs/breadcrumbs-actions";
import {SchoolsService} from "./schools.service";
import {schoolSelected, schoolsLoaded, schoolsViewOpened} from "./schools-actions";
import {Router} from "@angular/router";

@Injectable()
export class SchoolsEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private router: Router,
              private schoolsService: SchoolsService) {
  }

  reloadSchools$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(schoolsViewOpened))
      .pipe(
        exhaustMap(_ => this.schoolsService.getSchools()),
        map(schools => schoolsLoaded({schools: schools}))
      );
  });

  openSchoolView$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(schoolSelected))
      .pipe(
        tap(school => {
          return this.router.navigate(['schools', school.id]);
        }),
        map(school => changeBreadcrumb({name: school.name, url: this.router.url}))
      )
  })

  schoolsViewOpened$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(ofType(schoolsViewOpened))
      .pipe(
        map(_ => changeBreadcrumb({name: 'schools', url: this.router.url}))
      );
  });

}
