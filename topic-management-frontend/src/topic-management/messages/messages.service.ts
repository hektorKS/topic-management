import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TopicManagementServices} from "../topic-management-services";
import {NewMessage} from "./message-form/new-message.model";
import {Conversation, ConversationIdentifier} from "./conversation/conversation.model";
import {map} from "rxjs/operators";
import {Message} from "./message.model";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private httpClient: HttpClient) {
  }

  sendMessage(message: NewMessage): Observable<void> {
    return this.httpClient.post<void>(`${TopicManagementServices.MESSAGE_SERVICE}/api/v1/messages`, message);
  }

  getConversations(userId: string): Observable<Conversation[]> {
    return this.httpClient
      .get<{ conversations: Conversation[] }>(`${TopicManagementServices.MESSAGE_SERVICE}/api/v1/conversations/users/${userId}`)
      .pipe(
        map(response => response.conversations)
      );
  }

  getMessages(conversationIdentifier: ConversationIdentifier): Observable<Message[]> {
    return this.httpClient
      .post<{ messages: Message[] }>(`${TopicManagementServices.MESSAGE_SERVICE}/api/v1/conversations/messages`, {
        conversation: conversationIdentifier
      })
      .pipe(map(response => response.messages));
  }

}
