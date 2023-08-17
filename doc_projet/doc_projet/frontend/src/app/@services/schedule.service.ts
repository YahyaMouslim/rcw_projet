import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../@core/models/course.model";
import {Schedule} from "../@core/models/schedule.model";

@Injectable({providedIn:'root'})
export class ScheduleService {
  //private readonly API_URL = environment.API_URL;
  private readonly API_URL = 'http://localhost:3004/api/v1';

  constructor(private http: HttpClient) {
  }

  get = () => this.http.get<Schedule[]>(`${this.API_URL}/schedules`);

  post = (schedule: any) => this.http.post(`${this.API_URL}/schedules`, schedule);

  delete = (id: number) => this.http.delete(`${this.API_URL}/schedules/`+id);

  /*update = (id: number,course: Course) => this.http.put(`${this.API_URL}/courses/`+id, course);

  */



}
