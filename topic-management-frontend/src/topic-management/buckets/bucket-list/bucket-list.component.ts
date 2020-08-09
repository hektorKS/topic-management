import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {BucketState, BucketStateView} from '../bucket/bucket.model';
import {loadBucketsInSchool} from "../buckets-actions";
import {bucketsInSchoolSelector} from "../../topic-management-state";
import {bucketOperationInProgressSelector} from "../bucket/bucket-state";
import {newBucketButtonClicked} from "../bucket/bucket-actions";
import {selectSchoolId} from "../../topic-management-router-state";
import {filter, flatMap, tap} from "rxjs/operators";

@Component({
  selector: 'bucket-list',
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
              (click)="createBucket($event)">
        New bucket
      </button>
    </div>
  `,
  styleUrls: ['bucket-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketListComponent implements OnInit {
  readonly BucketState: typeof BucketState = BucketState;

  buckets$: Observable<BucketStateView[]>;
  newBucketInProgress$: Observable<boolean>;

  @Input() schoolId: string;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.buckets$ = this.store.select(selectSchoolId).pipe(
      filter(_ => _ !== undefined),
      tap(schoolId => this.store.dispatch(loadBucketsInSchool({schoolId: schoolId}))),
      flatMap(schoolId => this.store.pipe(select(bucketsInSchoolSelector, {schoolId: schoolId})))
    );
    this.newBucketInProgress$ = this.store.select(bucketOperationInProgressSelector);
  }

  createBucket(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(newBucketButtonClicked());
  }
}
