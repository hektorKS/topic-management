import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TopicManagementServices} from "../topic-management.model";
import {UsernameUser} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  searchUsernames(value: string): Observable<UsernameUser[]> {
    return this.httpClient.post<{ usernameUsers: UsernameUser[] }>(
      `${TopicManagementServices.USER_SERVICE}/api/v1/users/search`,
      {
        value: value
      }
    ).pipe(map(response => response.usernameUsers))
  }

}
