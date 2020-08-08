import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {Bucket} from "../bucket/bucket.model";
import {newBucketSelector} from "./new-bucket-state";
import {newBucketApproved, newBucketCanceled, newBucketFormUpdated} from "./new-bucket-actions";

@Component({
  selector: 'bucket-form',
  template: `
    <div class="bucket-form-with-buttons">
      <form *ngIf="formBucket$ | async; let bucket" [formGroup]="bucketFormGroup" class="bucket-form">
        <mat-form-field appearance="outline" class="bucket-name mat-form-field-should-float">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" (keydown)="$event.stopPropagation()">
        </mat-form-field>
      </form>
      <div class="button-form-buttons">
        <span class="icon-small icon-button approve-button"
              [ngClass]="{'disabled': !isFormValid()}"
              (click)="approve()"></span>
        <span class="icon-small icon-button cancel-button"
              (click)="cancel()"></span>
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

  formBucket$: Observable<Bucket>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.formBucket$ = this.store.select(newBucketSelector);
    this.bucketFormGroup.valueChanges.subscribe(newValue => {
        this.store.dispatch(newBucketFormUpdated({
          bucketView: {
            name: newValue.name
          }
        }));
      }
    )
  }

  approve(): void {
    this.store.dispatch(newBucketApproved());
  }

  cancel(): void {
    this.store.dispatch(newBucketCanceled());
  }

  isFormValid(): boolean {
    return this.bucketFormGroup.valid && !this.bucketFormGroup.pristine
  }
}
