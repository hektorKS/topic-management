import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {messageValueChanged, submitNewMessageButtonClicked} from "./message-form-actions";

@Component({
  selector: 'message-form',
  template: `
    <div class="message-form-wrapper">
      <form [formGroup]="messageFormGroup">
        <mat-form-field appearance="outline" class="mat-form-field-should-float">
          <mat-label>Message</mat-label>
          <textarea matInput formControlName="message"
                    class="message-textarea"
                    (keydown)="$event.stopPropagation()">
          </textarea>
        </mat-form-field>
      </form>
      <button mat-raised-button
              class="send-message-button custom-button-dark"
              [disabled]="messageEmpty()"
              (click)="submit()">
        Send
      </button>
    </div>
  `,
  styleUrls: ['message-form.component.scss']
})
export class MessageFormComponent implements OnInit {
  messageFormGroup = new FormGroup({
    message: new FormControl('')
  });

  @Input() recipientId: string;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.messageFormGroup.valueChanges.subscribe(newValue => {
      this.store.dispatch(messageValueChanged({
        message: {
          message: newValue.message
        }
      }));
    });
  }

  messageEmpty(): boolean {
    return this.messageFormGroup.get('message').value === '';
  }

  submit(): void {
    this.store.dispatch(submitNewMessageButtonClicked({recipientId: this.recipientId}));
    this.messageFormGroup.get('message').setValue('');
    this.messageFormGroup.markAsPristine();
  }
}
