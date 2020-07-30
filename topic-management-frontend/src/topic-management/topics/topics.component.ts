import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {topicsViewOpened} from "./topics-actions";
import {Observable} from "rxjs";
import {Topic} from "./topic/topic.model";
import {topicsSelector} from "../topic-management-state";

@Component({
  selector: 'topics',
  template: `
    <div *ngFor="let topic of topics$ | async">
      {{ topic | json }}
    </div>
  `,
  styleUrls: ['topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicsComponent implements OnInit {

  topics$: Observable<Topic[]> = this.store.select(topicsSelector);

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(topicsViewOpened())
  }

}
