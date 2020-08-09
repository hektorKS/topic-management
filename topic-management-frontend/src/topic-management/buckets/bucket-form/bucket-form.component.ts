import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {bucketOperationTypeSelector, bucketSelector} from "../bucket/bucket-state";
import {
  bucketFormCancelButtonClicked,
  bucketFormUpdated,
  newBucketSubmitted,
  updateBucketSubmitted
} from "../bucket/bucket-actions";
import {first} from "rxjs/operators";
import {OperationType} from "../../operation/operation-type";
import {Observable} from "rxjs";

@Component({
  selector: 'bucket-form',
  template: `
    <div class="bucket-form-with-buttons">
      <form [formGroup]="bucketFormGroup" class="bucket-form">
        <mat-form-field appearance="outline" class="bucket-name mat-form-field-should-float">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" (keydown)="$event.stopPropagation()">
        </mat-form-field>
      </form>
      <div class="bucket-form-buttons">
        <span class="icon-small icon-button submit-bucket-button"
              [ngClass]="{'disabled': !isFormValid()}"
              (click)="submit($event)"></span>
        <span class="icon-small icon-button cancel-bucket-button"
              (click)="cancel($event)"></span>
      </div>
    </div>
  `,
  styleUrls: ['bucket-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BucketFormComponent implements OnInit {
  bucketFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
    }
  );

  operationType$: Observable<OperationType>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(bucketSelector).pipe(first()).subscribe(bucket => {
      this.bucketFormGroup.get('name').setValue(bucket.name);
    });
    this.bucketFormGroup.valueChanges.subscribe(newValue => {
        this.store.dispatch(bucketFormUpdated({
          bucket: {
            name: newValue.name
          }
        }));
      }
    );
    this.operationType$ = this.store.select(bucketOperationTypeSelector).pipe(first());
  }

  submit(event: MouseEvent): void {
    event.stopPropagation();
    this.operationType$.subscribe(operationType => {
        if (operationType == OperationType.CREATE) {
          this.store.dispatch(newBucketSubmitted());
        } else if (operationType == OperationType.UPDATE) {
          this.store.dispatch(updateBucketSubmitted());
        }
      }
    )

  }

  cancel(event: MouseEvent): void {
    event.stopPropagation();
    this.store.dispatch(bucketFormCancelButtonClicked());
  }

  isFormValid(): boolean {
    return this.bucketFormGroup.valid && !this.bucketFormGroup.pristine
  }
}
