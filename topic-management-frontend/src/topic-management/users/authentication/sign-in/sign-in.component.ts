import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {signInButtonClicked, signInFormDataChanged} from "../authentication-actions";

export interface SignInData {
  username: string,
  password: string
}

@Component({
  selector: 'sign-in',
  template: `
    <div class="sign-in-form-wrapper">
      <span class="app-title">Topic management</span>
      <form [formGroup]="signInFormGroup" class="sign-in-form">
        <mat-form-field appearance="outline" class="mat-form-field-should-float">
          <mat-label>Username</mat-label>
          <input matInput formControlName="username">
        </mat-form-field>
        <mat-form-field appearance="outline" class="mat-form-field-should-float">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
      </form>
      <button mat-raised-button
              class="sign-in-submit-button custom-button-dark"
              [disabled]="!isFormValid()"
              (click)="submit($event)">
        Sign in
      </button>
    </div>
  `,
  styleUrls: [
    'sign-in.component.scss'
  ]
})
export class SignInComponent implements OnInit {
  signInFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required, Validators.minLength(3), Validators.maxLength(40)]
    ),
    password: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(32)
    ])
  });

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.signInFormGroup.valueChanges.subscribe(newValue => {
      this.store.dispatch(signInFormDataChanged({signInData: {...newValue}}))
    })
  }

  isFormValid(): boolean {
    return !this.signInFormGroup.pristine && this.signInFormGroup.valid;
  }

  // #NiceToHave submit on enter
  submit(event: MouseEvent): void {
    this.store.dispatch(signInButtonClicked());
    event.stopPropagation();
  }
}
