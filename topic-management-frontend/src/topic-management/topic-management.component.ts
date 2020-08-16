import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {userSignedInSelector} from "./topic-management-state";
import {signOut} from "./users/authentication/authentication-actions";

@Component({
  selector: 'topic-management',
  template: `
    <mat-toolbar color="primary" *ngIf="userSignedIn$ | async">
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>menu</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="redirectToSchools()">
          <mat-icon>school</mat-icon>
          <span>Schools</span>
        </button>
        <button mat-menu-item (click)="redirectToMessages()">
          <mat-icon>message</mat-icon>
          <span>Messages</span>
        </button>
        <button mat-menu-item (click)="signOut()">
          <mat-icon>login</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
      <breadcrumbs></breadcrumbs>
    </mat-toolbar>
    <topic-management-main></topic-management-main>
  `,
  styleUrls: ['topic-management.component.scss']
})
export class TopicManagementComponent implements OnInit {

  userSignedIn$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit(): void {
    this.userSignedIn$ = this.store.select(userSignedInSelector);
  }

  redirectToSchools() {
    this.router.navigate(['schools']).then()
  }

  redirectToMessages() {
    // #NiceToHave show new messages count
    this.router.navigate(['messages']).then()
  }

  signOut(): void {
    this.store.dispatch(signOut());
  }
}
