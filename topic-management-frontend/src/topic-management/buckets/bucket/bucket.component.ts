import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectBucketId} from "../../topic-management-router-state";
import {Observable} from "rxjs";

@Component({
  selector: 'bucket',
  template: `
    {{ routeBucketId$ | async }}
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
  }

}
