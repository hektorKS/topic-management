import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTopicId} from "../../topic-management-router-state";
import {loadTopic, saveTopic, updateFormTopic} from "../topics-actions";
import {Topic} from "./topic.model";
import {
  currentUserIdSelector,
  formTopicAutocompletionUsersSelector,
  formTopicSelector
} from "../../topic-management-state";
import {filter, map, take, tap, withLatestFrom} from "rxjs/operators";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {UsernameAutocompletionService} from "./username-autocompletion.service";
import {UsernameUser} from "../../user/user.model";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {searchAutocompletionUsernames} from "../../user/users-actions";

@Component({
  selector: 'topic',
  template: `
    <form *ngIf="formTopic$ | async; let topic" [formGroup]="topicFormGroup" class="topic-form-wrapper">
      <mat-form-field appearance="outline" class="topic-title mat-form-field-should-float">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" [readonly]="isReadonly$ | async">
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" [readonly]="isReadonly$ | async"></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Supervisor</mat-label>
        <input matInput [value]="topic.supervisor.firstName + ' ' + topic.supervisor.lastName" readonly>
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Students</mat-label>
        <div class="topic-students">
          <student-form-panel *ngFor="let student of topic.students"
                              [isReadonly]="isReadonly$ | async"
                              [student]="student"
                              (studentRemoved)="onStudentRemoved($event)">
          </student-form-panel>
          <input matInput [matAutocomplete]="auto" formControlName="newStudent">
          <mat-autocomplete #auto="matAutocomplete"
                            [displayWith]="autocompleteDisplayValue"
                            (optionSelected)="onStudentAdded($event)">
            <mat-option *ngFor="let user of autocompletionUsers$ | async" [value]="user">
              {{ user.username }}
            </mat-option>
          </mat-autocomplete>
        </div>
      </mat-form-field>
      <button mat-raised-button class="submit-topic-button"
              [disabled]="topicFormGroup.pristine"
              (click)="updateTopic()">
        Save
      </button>
    </form>
  `,
  styleUrls: ['topic.component.scss'],
  providers: [UsernameAutocompletionService]
})
export class TopicComponent implements OnInit {
  topicFormGroup: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    supervisor: new FormControl({id: undefined, firstName: '', lastName: '', username: ''}),
    students: new FormArray([]),
    newStudent: new FormControl({id: undefined, username: ''})
  });

  formTopic$: Observable<Topic>;
  isReadonly$: Observable<boolean>;
  autocompletionUsers$: Observable<UsernameUser[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectTopicId)
      .pipe(filter(topic => topic !== undefined))
      .subscribe(topicId => this.store.dispatch(loadTopic({topicId: topicId})));
    this.formTopic$ = this.store.select(formTopicSelector).pipe(filter(topic => topic !== undefined));
    this.isReadonly$ = this.store.select(currentUserIdSelector).pipe(
      withLatestFrom(this.formTopic$),
      map(([userId, topic]) => !(userId == topic.supervisor.id))
    );
    this.autocompletionUsers$ = this.store.select(formTopicAutocompletionUsersSelector).pipe(
      withLatestFrom(this.formTopic$),
      map(([users, topic]) => {
        const ids = topic.students.map(student => student.id);
        return users.filter(user => !ids.includes(user.id));
      })
    );
    this.initForm();
    this.initFormEventsHandlers();
  }

  private initForm(): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
      this.topicFormGroup.get('title').setValue(topic.title);
      this.topicFormGroup.get('description').setValue(topic.description);
      this.topicFormGroup.get('supervisor').setValue(topic.supervisor);
      this.topicFormGroup.get('newStudent').setValue({id: undefined, username: ''});
      this.topicFormGroup.markAsPristine();
    });
  }

  private initFormEventsHandlers(): void {
    this.topicFormGroup.valueChanges.subscribe(newValue => {
      this.store.dispatch(updateFormTopic({
        title: newValue.title,
        description: newValue.description
      }));
    })
    this.topicFormGroup.get('newStudent').valueChanges.pipe(
      filter(newValue => newValue.length > 0),
      tap(newValue => {
        this.store.dispatch(searchAutocompletionUsernames({value: newValue}));
      }),
      withLatestFrom(this.autocompletionUsers$),
    ).subscribe(([newValue, users]) => {
      users.filter(value => value.username.toLowerCase().indexOf(newValue.toLowerCase()) === 0);
    });
  }

  autocompleteDisplayValue(user: UsernameUser): string {
    return user.username;
  }

  onStudentRemoved(userId: string): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
        const newStudents = [];
        for (const student of topic.students) {
          if (userId != student.id) {
            newStudents.push(student);
          }
        }
        this.store.dispatch(updateFormTopic({students: newStudents}));
      }
    );
  }

  onStudentAdded(event: MatAutocompleteSelectedEvent): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
        this.topicFormGroup.get('newStudent').setValue({id: undefined, username: ''});
        this.store.dispatch(updateFormTopic({students: [...topic.students, event.option.value]}));
      }
    );
  }

  updateTopic(): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
        this.store.dispatch(saveTopic(topic));
      }
    );
  }
}
