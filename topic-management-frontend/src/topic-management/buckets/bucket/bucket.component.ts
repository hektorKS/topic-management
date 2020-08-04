import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectBucketId} from "../../topic-management-router-state";
import {Observable} from "rxjs";
import {Bucket} from "./bucket.model";
import {activeBucketSelector} from "../../topic-management-state";
import {loadTopicsInBucket} from "../../topics/topics-actions";
import {loadBucket} from "../buckets-actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'bucket',
  template: `
    <div>
      <div *ngIf="bucket$ | async; let bucket" class="bucket-name"> {{ bucket.name }} </div>
      <topics></topics>
    </div>
  `,
  styleUrls: ['bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketComponent implements OnInit {

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

}
