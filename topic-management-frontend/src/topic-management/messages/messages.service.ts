import {Injectable} from "@angular/core";
import {Message} from "./message.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TopicManagementServices} from "../topic-management-services";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) {
  }

  sendMessage(message: Message): Observable<void> {
    return this.httpClient.post<void>(`${TopicManagementServices.MESSAGE_SERVICE}/api/v1/messages`, message);
  }

}
