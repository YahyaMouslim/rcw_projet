import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../@core/models/course.model";
import {Classroom} from "../@core/models/classroom.model";

@Injectable({providedIn:'root'})
export class ClassroomService {
  //private readonly API_URL = environment.API_URL;
  private readonly API_URL = 'http://localhost:3001/api/v1';

  constructor(private http: HttpClient) {
  }

  get = () => this.http.get<Classroom[]>(`${this.API_URL}/classrooms`);

  getById = (id: number) => this.http.get<Classroom>(`${this.API_URL}/classrooms/`+id);

  post = (classroom: Classroom) => this.http.post(`${this.API_URL}/classrooms`, classroom);

  update = (id: number, classroom: Classroom) => this.http.put(`${this.API_URL}/classrooms/`+id, classroom);

  delete = (id: number) => this.http.delete(`${this.API_URL}/classrooms/`+id);

}
