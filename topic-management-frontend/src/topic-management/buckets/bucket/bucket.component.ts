import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectBucketId} from "../../topic-management-router-state";
import {Observable} from "rxjs";
import {singleBucketViewOpened} from "../buckets-actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'bucket',
  template: `
    <div class="bucket-view-wrapper">

      <topics></topics>
    </div>
  `,
  styleUrls: ['bucket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketComponent implements OnInit {

  routeBucketId$: Observable<string>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.routeBucketId$ = this.store.select(selectBucketId);
    this.routeBucketId$.pipe(filter(bucketId => bucketId !== undefined))
      .subscribe(bucketId => this.store.dispatch(singleBucketViewOpened({bucketId: bucketId})));
  }

}
