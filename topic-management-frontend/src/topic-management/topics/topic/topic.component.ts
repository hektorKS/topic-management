import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTopicId} from "../../topic-management-router-state";
import {
  clearTopic,
  contactSupervisorButtonClicked,
  deleteTopic,
  loadTopic,
  topicBackButtonClicked,
  updateTopic
} from "../topics-actions";
import {Topic} from "./topic.model";
import {filter, first} from "rxjs/operators";
import {TopicFormService} from "./form/topic-form.service";
import {formSendMessageSelector} from "../../topic-management-state";

@Component({
  selector: 'topic',
  template: `
    <div *ngIf="formTopic$ | async" class="topic-view-wrapper">
      <topic-form></topic-form>
      <div class="spread-buttons">
        <button mat-raised-button class="custom-button-dark"
                (click)="backClicked()">
          Back
        </button>
        <button *ngIf="topicOwner$ | async"
                mat-raised-button class="custom-button-dark"
                [disabled]="isFormChanged()"
                (click)="updateTopic()">
          Save
        </button>
        <button *ngIf="!(topicOwner$ | async)"
                mat-raised-button class="custom-button-dark"
                [disabled]="sendMessage$ | async"
                (click)="contactSupervisor()">
          Contact supervisor
        </button>
      </div>
      <button *ngIf="topicOwner$ | async"
              mat-raised-button class="custom-button-dark delete-topic-button"
              [disabled]="!isFormChanged()"
              (click)="deleteTopic()">
        Delete
      </button>
    </div>
    <message-form *ngIf="sendMessage$ | async" [recipientId]="(formTopic$ | async).supervisor.id"></message-form>
  `,
  styleUrls: ['topic.component.scss'],
  providers: [TopicFormService]
})
export class TopicComponent implements OnInit, OnDestroy {
  formTopic$: Observable<Topic>;
  topicOwner$: Observable<boolean>;
  sendMessage$: Observable<boolean>;

  constructor(private store: Store, private topicFormService: TopicFormService) {
  }

  ngOnInit(): void {
    this.store.select(selectTopicId)
      .pipe(filter(topic => topic !== undefined))
      .subscribe(topicId => this.store.dispatch(loadTopic({topicId: topicId})));
    this.formTopic$ = this.topicFormService.getFormTopicObservable();
    this.topicOwner$ = this.topicFormService.getTopicOwnerObservable();
    this.sendMessage$ = this.store.select(formSendMessageSelector);
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearTopic());
  }

  isFormChanged(): boolean {
    // #NiceToHave Diff between two objects should be checked to verify is changed
    return this.topicFormService.isFormSubmitDisabled();
  }

  updateTopic(): void {
    this.formTopic$.pipe(first()).subscribe(topic => {
        this.store.dispatch(updateTopic(topic));
      }
    );
  }

  deleteTopic() {
    this.formTopic$.pipe(first()).subscribe(topic => {
        this.store.dispatch(deleteTopic({topicId: topic.id}));
      }
    );
  }

  backClicked() {
    this.store.dispatch(topicBackButtonClicked());
  }

  contactSupervisor(): void {
    this.store.dispatch(contactSupervisorButtonClicked());
  }
}
