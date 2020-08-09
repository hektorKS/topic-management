import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {filter, first, map, tap, withLatestFrom} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {UsernameUser} from "../../../user/user.model";
import {updateFormTopic} from "../../topics-actions";
import {Topic} from "../topic.model";
import {formTopicAutocompletionUsersSelector} from "../../../topic-management-state";
import {searchAutocompletionUsernames} from "../../../user/users-actions";
import {TopicFormService} from "./topic-form.service";

@Component({
  selector: 'topic-form',
  template: `
    <form *ngIf="formTopic$ | async; let topic" [formGroup]="topicFormGroup" class="topic-form-wrapper">
      <mat-form-field appearance="outline" class="topic-title mat-form-field-should-float">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" [readonly]="!(topicOwner$ | async)">
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" class="topic-description" [readonly]="!(topicOwner$ | async)"></textarea>
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Supervisor</mat-label>
        <input matInput [value]="topic.supervisor.firstName + ' ' + topic.supervisor.lastName" readonly>
      </mat-form-field>
      <mat-form-field appearance="outline" class="custom-form-field mat-form-field-should-float">
        <mat-label>Students</mat-label>
        <div class="topic-students">
          <student-form-panel *ngFor="let student of topic.students"
                              [isReadonly]="!(topicOwner$ | async)"
                              [student]="student"
                              (studentRemoved)="onStudentRemoved($event)">
          </student-form-panel>
          <input matInput [matAutocomplete]="auto" [readonly]="!(topicOwner$ | async)" formControlName="newStudent">
          <mat-autocomplete #auto="matAutocomplete"
                            [displayWith]="autocompleteDisplayValue"
                            (optionSelected)="onStudentAdded($event)">
            <mat-option *ngFor="let user of autocompletionUsers$ | async" [value]="user">
              {{ user.username }}
            </mat-option>
          </mat-autocomplete>
        </div>
      </mat-form-field>
    </form>
  `,
  styleUrls: ['topic-form.component.scss']
})
export class TopicFormComponent implements OnInit {

  formTopic$: Observable<Topic>;
  topicOwner$: Observable<boolean>;
  topicFormGroup: FormGroup;
  autocompletionUsers$: Observable<UsernameUser[]>;

  constructor(private store: Store, private topicFormService: TopicFormService) {
  }

  ngOnInit(): void {
    this.formTopic$ = this.topicFormService.getFormTopicObservable();
    this.topicOwner$ = this.topicFormService.getTopicOwnerObservable();
    this.topicFormGroup = this.topicFormService.getTopicFormGroup();
    this.initAutocompletion();
  }

  private initAutocompletion(): void {
    this.autocompletionUsers$ = this.store.select(formTopicAutocompletionUsersSelector).pipe(
      withLatestFrom(this.formTopic$),
      map(([users, topic]) => {
        const ids = topic.students.map(student => student.id);
        return users.filter(user => !ids.includes(user.id));
      })
    );
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
    this.formTopic$.pipe(first()).subscribe(topic => {
        const newStudents = [];
        for (const student of topic.students) {
          if (userId != student.id) {
            newStudents.push(student);
          }
        }
        this.store.dispatch(updateFormTopic({students: newStudents}));
        this.topicFormGroup.markAsDirty();
      }
    );
  }

  onStudentAdded(event: MatAutocompleteSelectedEvent): void {
    this.formTopic$.pipe(first()).subscribe(topic => {
        this.topicFormGroup.get('newStudent').setValue({id: undefined, username: ''});
        this.store.dispatch(updateFormTopic({students: [...topic.students, event.option.value]}));
      }
    );
  }
}
