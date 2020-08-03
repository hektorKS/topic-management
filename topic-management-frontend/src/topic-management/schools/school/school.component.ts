import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectSchoolId} from "../../topic-management-router-state";
import {Observable, Subject} from "rxjs";
import {School} from "./school.model";
import {schoolSelector} from "../../topic-management-state";
import {tap} from "rxjs/operators";
import {schoolViewOpened} from "../schools-actions";

@Component({
  selector: 'school',
  template: `
    <div class="school-view-wrapper">
      <img class="school-icon" src="/assets/school-primary-dark-48dp.svg" alt=""/>
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
    <buckets [schoolId]="routeSchoolId$ | async"></buckets>
  `,
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent implements OnInit, OnDestroy {

  routeSchoolId$: Observable<string>;
  school$: Subject<School> = new Subject<School>();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(schoolViewOpened());
    this.routeSchoolId$ = this.store.select(selectSchoolId).pipe(
      tap(schoolId => this.store.pipe(select(schoolSelector, {schoolId: schoolId}))
        .pipe(tap(school => this.school$.next(school)))
        .subscribe())
    );
  }

  ngOnDestroy(): void {
    this.school$.complete();
  }

}
