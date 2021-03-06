import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectBucketId} from "../../topic-management-router-state";
import {Observable} from "rxjs";
import {activeBucketSelector} from "../../topic-management-state";
import {loadTopicsInBucket, newTopicButtonSelected} from "../../topics/topics-actions";
import {filter} from "rxjs/operators";
import {Bucket} from "../bucket/bucket.model";
import {loadBucket} from "../buckets-actions";

@Component({
  selector: 'bucket-details',
  template: `
    <div class="bucket-wrapper">
      <div *ngIf="bucket$ | async; let bucket" class="bucket-name"> {{ bucket.name }} </div>
      <topic-list [bucketId]="bucketId$ | async"></topic-list>
      <button mat-raised-button class="custom-button-light new-topic-button" (click)="createTopic()">
        New topic
      </button>
    </div>
  `,
  styleUrls: ['bucket-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketDetailsComponent implements OnInit {

  bucketId$: Observable<string>;
  bucket$: Observable<Bucket>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.bucketId$ = this.store.select(selectBucketId).pipe(filter(bucketId => bucketId !== undefined));
    this.bucketId$.subscribe(bucketId => this.store.dispatch(loadBucket({bucketId: bucketId})));
    this.bucketId$.subscribe(bucketId => this.store.dispatch(loadTopicsInBucket({bucketId: bucketId})));
    this.bucket$ = this.store.select(activeBucketSelector);
  }

  createTopic(): void {
    this.store.dispatch(newTopicButtonSelected());
  }
}
