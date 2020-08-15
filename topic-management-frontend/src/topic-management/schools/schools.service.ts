import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {School} from "./school/school.model";
import {TopicManagementServices} from "../topic-management-services";

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(private httpClient: HttpClient) {
  }

  getSchools(): Observable<School[]> {
    return this.httpClient.get<{ schools: School[] }>(`${TopicManagementServices.SCHOOL_SERVICE}/api/v1/schools`)
      .pipe(
        map(response => response.schools),
        map(schools => schools.sort((left, right) => left.name.localeCompare(right.name)))
      )
  }

}
