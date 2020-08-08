import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {UsernameUser} from "../../user/user.model";

@Component({
  selector: 'student-form-panel',
  template: `
    <div class="mat-raised-button" disabled=true>
      <span>{{ student.username }}</span>
      <span *ngIf="!isReadonly"
            class="mat-icon-button remove-button"
            (click)="removeStudentFromTopic($event)">
      </span>
    </div>
  `,
  styleUrls: ['student-form-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentFormPanelComponent {

  @Input() student: UsernameUser;
  @Input() isReadonly: boolean;

  @Output() studentRemoved: EventEmitter<string> = new EventEmitter<string>();

  removeStudentFromTopic(event: MouseEvent): void {
    event.stopPropagation();
    this.studentRemoved.emit(this.student.id);
  }

}
