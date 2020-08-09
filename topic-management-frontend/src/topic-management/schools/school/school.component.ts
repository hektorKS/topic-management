import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectSchoolId} from "../../topic-management-router-state";
import {Observable} from "rxjs";
import {School} from "./school.model";
import {schoolSelector, schoolsSelector} from "../../topic-management-state";
import {filter, first, flatMap} from "rxjs/operators";
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
    <bucket-list [schoolId]="schoolId$ | async"></bucket-list>
  `,
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent implements OnInit {

  schoolId$: Observable<string>;
  school$: Observable<School>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.reloadSchoolsIfNotLoaded();
    this.schoolId$ = this.store.select(selectSchoolId).pipe(filter(_ => _ !== undefined));
    this.school$ = this.schoolId$.pipe(
      first(),
      flatMap(schoolId => this.store.select(schoolSelector, {schoolId: schoolId}))
    );
  }

  private reloadSchoolsIfNotLoaded(): void {
    this.store.select(schoolsSelector)
      .pipe(first(), filter(schools => schools.length == 0))
      .subscribe(_ => this.store.dispatch(schoolViewOpened()))
  }

}
