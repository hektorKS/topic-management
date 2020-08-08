import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTopicId} from "../../topic-management-router-state";
import {clearTopic, deleteTopic, loadTopic, topicBackButtonClicked, updateTopic} from "../topics-actions";
import {Topic} from "./topic.model";
import {filter, take} from "rxjs/operators";
import {TopicFormService} from "./form/topic-form.service";

@Component({
  selector: 'topic',
  template: `
    <div *ngIf="formTopic$ | async" class="topic-view-wrapper">
      <topic-form></topic-form>
      <div class="spread-buttons">
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="custom-button"
                (click)="backClicked()">
          Back
        </button>
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="custom-button"
                [disabled]="isFormChanged()"
                (click)="updateTopic()">
          Save
        </button>
      </div>
      <button *ngIf="topicOwner$ | async"
              mat-raised-button class="custom-button delete-topic-button"
              [disabled]="!isFormChanged()"
              (click)="deleteTopic()">
        Delete
      </button>
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

  isFormChanged(): boolean {
    // #NTH Diff between two objects should be checked to verify is changed
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

  backClicked() {
    this.store.dispatch(topicBackButtonClicked());
  }
}
