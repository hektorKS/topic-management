import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TopicManagementServices} from "../topic-management-services";
import {map} from "rxjs/operators";
import {Bucket, BucketState, BucketStateView} from "./bucket/bucket.model";

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  constructor(private httpClient: HttpClient) {
  }

  createNewBucket(bucket: Bucket): Observable<string> {
    return this.httpClient.post<{ id: string }>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets`,
      {
        name: bucket.name,
        ownerId: bucket.ownerId,
        schoolId: bucket.schoolId
      }).pipe(map(response => response.id));
  }

  updateBucket(bucket: Bucket): Observable<void> {
    return this.httpClient.patch<void>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/${bucket.id}`, {
      name: bucket.name
    });
  }

  deleteBucket(bucketId: string): Observable<void> {
    return this.httpClient.delete<void>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/${bucketId}`);
  }

  getBucketsInSchool(schoolId: string): Observable<BucketStateView[]> {
    return this.httpClient.get<{ buckets: Bucket[] }>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/school/${schoolId}`)
      .pipe(
        map(response => response.buckets),
        map(buckets => buckets.map(bucket => ({...bucket, bucketState: BucketState.UNCHANGED}))),
        map(bucketViews => bucketViews.sort((left, right) => left.name.localeCompare(right.name)))
      );
  }

  getBucketById(bucketId: string): Observable<Bucket> {
    return this.httpClient.get<{ bucket: Bucket }>(`${TopicManagementServices.BUCKET_SERVICE}/api/v1/buckets/${bucketId}`)
      .pipe(
        map(response => response.bucket)
      );
  }

}
