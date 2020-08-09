import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {BucketState, BucketStateView} from '../bucket/bucket.model';
import {loadBucketsInSchool} from "../buckets-actions";
import {bucketsInSchoolSelector} from "../../topic-management-state";
import {bucketOperationInProgressSelector} from "../bucket/bucket-state";
import {newBucketButtonClicked} from "../bucket/bucket-actions";

@Component({
  selector: 'buckets',
  template: `
    <div class="buckets-wrapper">
      <mat-selection-list #buckets [multiple]="false">
        <div *ngFor="let bucket of buckets$ | async">
          <ng-container [ngSwitch]="bucket.bucketState">
            <bucket-form-option *ngSwitchCase="BucketState.NEW"></bucket-form-option>
            <bucket-form-option *ngSwitchCase="BucketState.EDIT"></bucket-form-option>
            <bucket-view-option [bucket]="bucket" *ngSwitchDefault></bucket-view-option>
          </ng-container>
        </div>
      </mat-selection-list>
      <button mat-raised-button
              class="custom-button-light new-bucket-button"
              [disabled]="newBucketInProgress$ | async"
              (click)="createBucket()">
        New bucket
      </button>
    </div>
  `,
  styleUrls: ['buckets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketsComponent implements OnInit {
  readonly BucketState: typeof BucketState = BucketState;

  buckets$: Observable<BucketStateView[]>;
  newBucketInProgress$: Observable<boolean>;

  @Input() schoolId: string;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadBucketsInSchool({schoolId: this.schoolId}))
    this.buckets$ = this.store.pipe(select(bucketsInSchoolSelector, {schoolId: this.schoolId}))
    this.newBucketInProgress$ = this.store.select(bucketOperationInProgressSelector);
  }

  createBucket() {
    this.store.dispatch(newBucketButtonClicked());
  }
}
