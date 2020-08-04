import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Topic} from "./topic/topic.model";
import {topicsSelector} from "../topic-management-state";

@Component({
  selector: 'topics',
  template: `
    <mat-selection-list #topics [multiple]="false">
      <mat-list-option *ngFor="let topic of topics$ | async" [value]="topic" (click)="topicOptionClicked(topic)">
        <div class="topic-element">
          <span> {{ topic.title }} </span>
        </div>
      </mat-list-option>
    </mat-selection-list>
  `,
  styleUrls: ['topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit {

  topics$: Observable<Topic[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.topics$ = this.store.select(topicsSelector)
  }

  topicOptionClicked(topic: Topic): void {

  }

}
