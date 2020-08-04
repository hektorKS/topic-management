import {ChangeDetectionStrategy, Component, HostListener, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {breadcrumbsSelector} from "./breadcrumbs-state";
import {Breadcrumb} from "./breadcrumb.model";
import {breadcrumbsDestroyed, breadcrumbsInitialized, changeBreadcrumb} from "./breadcrumbs-actions";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'breadcrumbs',
  template: `
    <div class="breadcrumbs">
      <span *ngFor="let breadcrumb of breadcrumbs$ | async; last as isLast" class="breadcrumb">
      <a mat-button class="breadcrumb-button"
         [ngClass]="{'breadcrumb-button-active': breadcrumb.active}"
         (click)="breadcrumbClicked(breadcrumb)">
        {{breadcrumb.name}}
      </a>
      <mat-icon *ngIf="!isLast">{{ 'keyboard_arrow_right' }}</mat-icon>
     </span>
    </div>
  `,
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent implements OnInit {

  @HostListener('window:beforeunload')
  beforeUnloadHandler() {
    this.breadcrumbs$.pipe(
      take(1),
      tap(breadcrumbs => this.store.dispatch(breadcrumbsDestroyed({breadcrumbs: breadcrumbs})))
    ).subscribe()
  }

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(breadcrumbsInitialized());
    this.breadcrumbs$ = this.store.select(breadcrumbsSelector);
  }

  breadcrumbClicked(breadcrumb: Breadcrumb) {
    if (!breadcrumb.active) {
      this.router.navigateByUrl(breadcrumb.url).then(() =>
        this.store.dispatch(changeBreadcrumb(breadcrumb))
      );
    }
  }

}
