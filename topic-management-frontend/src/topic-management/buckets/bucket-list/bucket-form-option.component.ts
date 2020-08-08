import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {Store} from "@ngrx/store";
import {Bucket} from "../bucket/bucket.model";

@Component({
  selector: 'bucket-form-option',
  template: `
    <mat-list-option>
      <bucket-form></bucket-form>
    </mat-list-option>
  `,
  styleUrls: ['bucket-form-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketFormOptionComponent {

  @Input() bucket: Bucket;

  constructor(private store: Store) {
  }

}
