import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {bucketSelected} from "../buckets-actions";
import {Bucket} from "../bucket/bucket.model";
import {Observable} from "rxjs";
import {ownerSelector} from "../../topic-management-state";
import {bucketDeleteButtonClicked, bucketEditButtonClicked} from "../bucket/bucket-actions";

@Component({
  selector: 'bucket-view-option',
  template: `
    <mat-list-option *ngIf="bucket"
                     [value]="bucket"
                     (click)="bucketOptionClicked()">
      <div class="bucket-view-with-buttons">
        <span> {{ bucket.name }} </span>
        <div>
        <span class="icon-small icon-button bucket-edit-button"
              *ngIf="bucketOwner$ | async"
              (click)="edit($event)"></span>
          <span class="icon-small icon-button bucket-delete-button"
                *ngIf="bucketOwner$ | async"
                (click)="delete($event)"></span>
        </div>
      </div>
    </mat-list-option>
  `,
  styleUrls: ['bucket-view-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketViewOptionComponent implements OnInit {

  @Input() bucket: Bucket;

  bucketOwner$: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.bucketOwner$ = this.store.pipe(select(ownerSelector, {ownerId: this.bucket.ownerId}));
  }

  bucketOptionClicked() {
    this.store.dispatch(bucketSelected(this.bucket));
  }

  edit(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(bucketEditButtonClicked({bucket: this.bucket}));
  }

  delete(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(bucketDeleteButtonClicked({bucketId: this.bucket.id}));
  }
}
