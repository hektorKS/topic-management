import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {cancelNewTopic, clearTopic, initNewTopic, saveNewTopic} from "../topics-actions";
import {Topic} from "./topic.model";
import {first} from "rxjs/operators";
import {TopicFormService} from "./form/topic-form.service";

@Component({
  selector: 'new-topic',
  template: `
    <div *ngIf="formTopic$ | async" class="topic-view-wrapper">
      <topic-form></topic-form>
      <div class="spread-buttons">
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="custom-button"
                (click)="onCancelNewTopic()">
          Cancel
        </button>
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="custom-button"
                [disabled]="isFormSubmitDisabled()"
                (click)="onSaveNewTopic()">
          Save
        </button>
      </div>
    </div>
  `,
  styleUrls: ['topic.component.scss'],
  providers: [TopicFormService]
})
export class NewTopicComponent implements OnInit, OnDestroy {
  formTopic$: Observable<Topic>;
  topicOwner$: Observable<boolean>;

  constructor(private store: Store, private topicFormService: TopicFormService) {
  }

  ngOnInit(): void {
    this.store.dispatch(initNewTopic());
    this.formTopic$ = this.topicFormService.getFormTopicObservable();
    this.topicOwner$ = this.topicFormService.getTopicOwnerObservable();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearTopic());
  }

  isFormSubmitDisabled(): boolean {
    return this.topicFormService.isFormSubmitDisabled();
  }

  onSaveNewTopic(): void {
    this.formTopic$.pipe(first()).subscribe(topic => this.store.dispatch(saveNewTopic(topic))
    );
  }

  onCancelNewTopic() {
    this.store.dispatch(cancelNewTopic());
  }
}
