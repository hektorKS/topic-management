import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {breadcrumbsSelector} from "./breadcrumbs-state";
import {Breadcrumb} from "./breadcrumb.model";
import {changeBreadcrumb} from "./breadcrumbs-actions";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

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
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.breadcrumbs$ = this.store.select(breadcrumbsSelector)
  }

  breadcrumbClicked(breadcrumb: Breadcrumb) {
    if (!breadcrumb.active) {
      this.store.dispatch(changeBreadcrumb(breadcrumb));
      this.router.navigateByUrl(breadcrumb.url).then()
    }
  }

}
