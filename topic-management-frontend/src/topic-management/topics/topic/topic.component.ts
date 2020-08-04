import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectTopicId} from "../../topic-management-router-state";
import {loadTopic} from "../topics-actions";
import {Topic} from "./topic.model";
import {activeTopicSelector} from "../../topic-management-state";

@Component({
  selector: 'topic',
  template: `
    {{ topic$ | async | json }}
  `,
  styleUrls: ['topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicComponent implements OnInit {

  topicId$: Observable<string>;
  topic$: Observable<Topic>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.topicId$ = this.store.select(selectTopicId);
    this.topicId$.subscribe(topicId => this.store.dispatch(loadTopic({topicId: topicId})));
    this.topic$ = this.store.select(activeTopicSelector);
  }

}
