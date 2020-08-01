import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectSchoolId} from "../../topic-management-router-state";
import {Observable} from "rxjs";

@Component({
  selector: 'school',
  template: `
    <buckets [schoolId]="schoolId$ | async"></buckets>
  `,
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent implements OnInit {

  schoolId$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.schoolId$ = this.store.select(selectSchoolId);
  }

}
