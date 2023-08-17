import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../@core/models/course.model";

@Injectable({providedIn:'root'})
export class CourseService {
  //private readonly API_URL = environment.API_URL;
  private readonly API_URL = 'http://localhost:3002/api/v1';

  constructor(private http: HttpClient) {
  }

  get = () => this.http.get<Course[]>(`${this.API_URL}/courses`);

  getById = (id: number) => this.http.get<Course>(`${this.API_URL}/courses/`+id);

  post = (course: Course) => this.http.post(`${this.API_URL}/courses`, course);

  update = (id: number, course: Course) => this.http.put(`${this.API_URL}/courses/`+id, course);

  delete = (id: number) => this.http.delete(`${this.API_URL}/courses/`+id);



}
