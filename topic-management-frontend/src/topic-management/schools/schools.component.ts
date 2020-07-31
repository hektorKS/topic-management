import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {schoolSelected, schoolsViewOpened} from "./schools-actions";
import {School} from "./school/school.model";
import {schoolsSelector} from "../topic-management-state";

@Component({
  selector: 'schools',
  template: `
    <mat-selection-list #schools [multiple]="false">
      <mat-list-option *ngFor="let school of schools$ | async" [value]="school" (click)="schoolOptionClicked(school)">
        <div class="school-element">
          <span> {{ school.name }} </span>
          <span>
          {{
            school.address.zipCode + ' ' +
            school.address.city + ', ' +
            school.address.street + ' ' +
            school.address.buildingNumber
            }}
          </span>
        </div>
        <router-outlet></router-outlet>
      </mat-list-option>
    </mat-selection-list>
  `,
  styleUrls: ['schools.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolsComponent implements OnInit {

  schools$: Observable<School[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(schoolsViewOpened())
    this.schools$ = this.store.select(schoolsSelector);
  }

  schoolOptionClicked(school: School) {
    this.store.dispatch(schoolSelected(school));
  }

}
