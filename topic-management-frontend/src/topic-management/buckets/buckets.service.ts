import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TopicManagementServices} from "../topic-management.model";
import {map} from "rxjs/operators";
import {Bucket} from "./bucket/bucket.model";

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  constructor(private httpClient: HttpClient) {
  }

  getBucketsInSchool(schoolId: string): Observable<Bucket[]> {
    return this.httpClient.get<{ buckets: Bucket[] }>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/school/${schoolId}`)
      .pipe(
        map(response => response.buckets),
        map(schools => schools.sort((left, right) => left.name.localeCompare(right.name)))
      )
  }

  getBucketById(bucketId: string): Observable<Bucket> {
    return this.httpClient.get<{ bucket: Bucket }>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/${bucketId}`)
      .pipe(
        map(response => response.bucket)
      )
  }

}
