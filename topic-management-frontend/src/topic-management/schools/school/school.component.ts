import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectSchoolId} from "../../topic-management-router-state";
import {Observable, Subject} from "rxjs";
import {School} from "./school.model";
import {schoolSelector, schoolsSelector} from "../../topic-management-state";
import {filter, flatMap, tap} from "rxjs/operators";
import {schoolViewOpened} from "../schools-actions";

@Component({
  selector: 'school',
  template: `
    <div class="school-view-wrapper">
      <span class="school-icon icon-big"></span>
      <div *ngIf="school$ | async; let school" class="school-view">
        <div class="title">
          {{ school.name }}
        </div>
        <div class="address">
          {{
          school.address.street + ' ' +
          school.address.buildingNumber + ', ' +
          school.address.zipCode + ' ' +
          school.address.city
          }}
        </div>
      </div>
    </div>
    <buckets [schoolId]="schoolId$ | async"></buckets>
  `,
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent implements OnInit, OnDestroy {

  schoolId$: Observable<string>;
  school$: Subject<School> = new Subject<School>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.reloadSchoolsIfNotLoaded();
    this.schoolId$ = this.store.select(selectSchoolId).pipe(
      tap(schoolId => this.store.pipe(
        select(schoolSelector, {schoolId: schoolId}),
        tap(school => this.school$.next(school))
      ).subscribe())
    );
  }

  private reloadSchoolsIfNotLoaded(): void {
    this.store.select(schoolsSelector)
      .pipe(filter(schools => schools.length == 0))
      .subscribe(_ => this.store.dispatch(schoolViewOpened()))
  }

  ngOnDestroy(): void {
    this.school$.complete();
  }

}
