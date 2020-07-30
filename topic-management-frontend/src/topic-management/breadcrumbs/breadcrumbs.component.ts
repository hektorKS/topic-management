import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {breadcrumbsSelector} from "./breadcrumbs-state";

@Component({
  selector: 'breadcrumbs',
  template: `
    <mat-toolbar color="primary">
      <span *ngFor="let breadcrumb of breadcrumbs$ | async; last as isLast" style="color: white;">
        <a mat-button class="breadcrumb">
          {{breadcrumb.name}}
          <mat-icon *ngIf="!isLast">{{ 'keyboard_arrow_right' }}</mat-icon>
        </a>
      </span>
    </mat-toolbar>
  `,
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  breadcrumbs$ = this.store.select(breadcrumbsSelector);

  constructor(private store: Store) {
  }

}
