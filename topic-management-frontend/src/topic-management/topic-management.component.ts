import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'topic-management',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="redirectToSchools()">
          <mat-icon>school</mat-icon>
          <span>Schools</span>
        </button>
        <button mat-menu-item>
          <mat-icon>message</mat-icon>
          <span>Messages</span>
        </button>
        <button mat-menu-item>
          <mat-icon>login</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
      <breadcrumbs></breadcrumbs>
    </mat-toolbar>
    <topic-management-main></topic-management-main>
  `
})
export class TopicManagementComponent {

  constructor(private router: Router) {
  }

  redirectToSchools() {
    this.router.navigate(["schools"]).then()
  }
}
