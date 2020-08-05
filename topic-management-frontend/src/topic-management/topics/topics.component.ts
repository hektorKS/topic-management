import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Topic} from "./topic/topic.model";
import {topicsInBucketSelector} from "../topic-management-state";
import {UsernameUser} from "../user/user.model";
import {topicSelected} from "./topics-actions";

@Component({
  selector: 'topics',
  template: `
    <mat-selection-list #topics [multiple]="false">
      <mat-list-option *ngFor="let topic of topics$ | async" [value]="topic" (click)="topicOptionClicked(topic)">
        <div class="topic-option-wrapper">
          <div class="topic-icon-wrapper">
            <span *ngIf="topic.students.length == 0" class="topic-icon-lock-open icon-medium"></span>
            <span *ngIf="topic.students.length > 0" class="topic-icon-lock-closed icon-medium"></span>
          </div>
          <div class="topic-element">
            <div class="title-wrapper">
              <span class="topic-title"> {{ topic.title }} </span>
              <span class="topic-supervisor">
                Supervisor: {{ topic.supervisor.firstName + ' ' + topic.supervisor.lastName }}
              </span>
            </div>
            <div class="topic-description"> {{ topic.description }} </div>
            <div class="topic-assigned-students"> Students: {{ getStudentsUsernames(topic.students) }} </div>
          </div>
        </div>
      </mat-list-option>
    </mat-selection-list>
  `,
  styleUrls: ['topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit {

  @Input() bucketId: string;

  topics$: Observable<Topic[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.topics$ = this.store.pipe(select(topicsInBucketSelector, {bucketId: this.bucketId}));
  }

  getStudentsUsernames(students: UsernameUser[]): string {
    return students.map(student => student.username).join(",");
  }

  topicOptionClicked(topic: Topic): void {
    this.store.dispatch(topicSelected(topic));
  }

}
