import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {breadcrumbsSelector} from "./breadcrumbs-state";
import {Breadcrumb} from "./breadcrumb.model";
import {breadcrumbSelected} from "./breadcrumbs-actions";

@Component({
  selector: 'breadcrumbs',
  template: `
    <mat-toolbar color="primary">
      <span *ngFor="let breadcrumb of breadcrumbs$ | async; last as isLast" class="breadcrumb">
        <a mat-button class="breadcrumb-button"
           [ngClass]="{'breadcrumb-button-active': breadcrumb.active}"
           (click)="breadcrumbClicked(breadcrumb)">
          {{breadcrumb.name}}
        </a>
        <mat-icon *ngIf="!isLast">{{ 'keyboard_arrow_right' }}</mat-icon>
      </span>
    </mat-toolbar>
  `,
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  breadcrumbs$ = this.store.select(breadcrumbsSelector);

  constructor(private store: Store) {
  }

  breadcrumbClicked(breadcrumb: Breadcrumb) {
    this.store.dispatch(breadcrumbSelected(breadcrumb));
  }

}
