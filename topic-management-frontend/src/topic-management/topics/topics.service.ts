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

  getTopicsView(bucketId: string): Observable<Topic[]> {
    return this.httpClient.get<{ topicsView: Topic[] }>(
      `${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics/bucket/${bucketId}/view`
    ).pipe(map(response => response.topicsView))
  }

  getTopicView(topicId: string): Observable<Topic> {
    return this.httpClient.get<{ topicView: Topic }>(
      `${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics/${topicId}/view`
    ).pipe(map(response => response.topicView))
  }
}
