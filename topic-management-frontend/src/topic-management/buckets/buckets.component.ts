import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {bucketsInSchoolSelector,} from "../topic-management-state";
import {Bucket} from "./bucket/bucket.model";
import {bucketSelected, bucketsViewOpened} from "./buckets-actions";

@Component({
  selector: 'buckets',
  template: `
    <mat-selection-list #buckets [multiple]="false">
      <mat-list-option *ngFor="let bucket of buckets$ | async" [value]="bucket" (click)="bucketOptionClicked(bucket)">
        <div class="bucket-element">
          <span> {{ bucket.name }} </span>
        </div>
      </mat-list-option>
    </mat-selection-list>
  `,
  styleUrls: ['buckets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketsComponent implements OnInit {

  buckets$: Observable<Bucket[]>;

  @Input() schoolId: string;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(bucketsViewOpened({schoolId: this.schoolId}))
    this.buckets$ = this.store.pipe(select(bucketsInSchoolSelector, {schoolId: this.schoolId}))
  }

  bucketOptionClicked(bucket: Bucket) {
    this.store.dispatch(bucketSelected(bucket));
  }

}
