import {ChangeDetectionStrategy, Component} from "@angular/core";

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

}
