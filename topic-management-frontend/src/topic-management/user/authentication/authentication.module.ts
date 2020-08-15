import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {SignInComponent} from "./sign-in/sign-in.component";
import {StoreModule} from "@ngrx/store";
import {authenticationKey} from "./authentication-state";
import {authenticationReducer} from "./authentication-reducers";
import {EffectsModule} from "@ngrx/effects";
import {AuthenticationEffects} from "./authentication-effects";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthenticationInterceptor} from "./authentication-interceptor";
import {AuthenticationGuard} from "./authentication-guard";


@NgModule({
  declarations: [
    SignInComponent
  ],
  exports: [
    SignInComponent
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(authenticationKey, authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AuthenticationModule {
}
