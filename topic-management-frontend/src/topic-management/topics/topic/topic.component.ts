import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTopicId} from "../../topic-management-router-state";
import {clearTopic, deleteTopic, loadTopic, updateTopic} from "../topics-actions";
import {Topic} from "./topic.model";
import {filter, take} from "rxjs/operators";
import {TopicFormService} from "./form/topic-form.service";

@Component({
  selector: 'topic',
  template: `
    <div *ngIf="formTopic$ | async" class="topic-view-wrapper">
      <topic-form></topic-form>
      <div class="topic-buttons">
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="topic-button"
                (click)="deleteTopic()">
          Delete
        </button>
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="topic-button"
                [disabled]="isFormSubmitDisabled()"
                (click)="updateTopic()">
          Save
        </button>
      </div>
    </div>
  `,
  styleUrls: ['topic.component.scss'],
  providers: [TopicFormService]
})
export class TopicComponent implements OnInit, OnDestroy {
  formTopic$: Observable<Topic>;
  topicOwner$: Observable<boolean>;

  constructor(private store: Store, private topicFormService: TopicFormService) {
  }

  ngOnInit(): void {
    this.store.select(selectTopicId)
      .pipe(filter(topic => topic !== undefined))
      .subscribe(topicId => this.store.dispatch(loadTopic({topicId: topicId})));
    this.formTopic$ = this.topicFormService.getFormTopicObservable();
    this.topicOwner$ = this.topicFormService.getTopicOwnerObservable();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearTopic());
  }

  isFormSubmitDisabled(): boolean {
    return this.topicFormService.isFormSubmitDisabled();
  }

  updateTopic(): void {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
        this.store.dispatch(updateTopic(topic));
      }
    );
  }

  deleteTopic() {
    this.formTopic$.pipe(take(1)).subscribe(topic => {
        this.store.dispatch(deleteTopic({topicId: topic.id}));
      }
    );
  }
}
