import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "./topic/topic.model";
import {map} from "rxjs/operators";
import {TopicManagementServices} from "../topic-management.model";

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private httpClient: HttpClient) {
  }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<{ topics: Topic[] }>(`${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics`)
      .pipe(
        map(response => response.topics)
      )
  }
}