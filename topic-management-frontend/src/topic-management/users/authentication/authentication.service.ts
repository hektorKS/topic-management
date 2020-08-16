import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SignInData} from "./sign-in/sign-in.component";
import {Observable} from "rxjs";
import {SignedInUser} from "../user.model";
import {TopicManagementServices} from "../../topic-management-services";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private httpClient: HttpClient) {
  }

  signIn(signInData: SignInData): Observable<SignedInUser> {
    return this.httpClient.post<SignedInUser>(
      `${TopicManagementServices.USER_SERVICE}/api/v1/users/sign-in`,
      signInData
    )
  }

}
