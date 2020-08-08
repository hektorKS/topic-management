import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {bucketSelected} from "../buckets-actions";
import {Bucket} from "../bucket/bucket.model";

@Component({
  selector: 'bucket-view-option',
  template: `
    <mat-list-option *ngIf="bucket"
                     [value]="bucket"
                     (click)="bucketOptionClicked(bucket)">
      <span> {{ bucket.name }} </span>
    </mat-list-option>
  `,
  styleUrls: ['bucket-view-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketViewOptionComponent {

  @Input() bucket: Bucket;

  constructor(private store: Store) {
  }

  bucketOptionClicked(bucket: Bucket) {
    this.store.dispatch(bucketSelected(bucket));
  }

}
