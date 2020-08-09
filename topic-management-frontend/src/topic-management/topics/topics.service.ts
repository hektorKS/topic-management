import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "./topic/topic.model";
import {map} from "rxjs/operators";
import {TopicManagementServices} from "../topic-management.model";

@Injectable({
  providedIn: 'root'
})
// #NiceToHave - Server exceptions handling mechanism
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

  updateTopic(topic: Topic): void {
    this.httpClient.patch<void>(
      `${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics/${topic.id}`,
      {
        bucketId: topic.bucketId,
        title: topic.title,
        description: topic.description,
        supervisorId: topic.supervisor.id,
        studentIds: topic.students.map(student => student.id)
      }
    ).subscribe()
  }

  saveTopic(topic: Topic): Observable<void> {
    return this.httpClient.post<void>(
      `${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics`,
      {
        bucketId: topic.bucketId,
        title: topic.title,
        description: topic.description,
        supervisorId: topic.supervisor.id,
        studentIds: topic.students.map(student => student.id)
      }
    );
  }

  deleteTopic(topicId: string): void {
    this.httpClient.delete<void>(`${TopicManagementServices.TOPIC_SERVICE}/api/v1/topics/${topicId}`).subscribe()
  }
}
