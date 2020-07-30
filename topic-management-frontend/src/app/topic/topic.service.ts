import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Topic} from "./topic.model";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private httpClient: HttpClient) {
  }

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>("http://localhost:9700")
  }
}
