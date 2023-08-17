import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../@core/models/course.model";
import {Program} from "../@core/models/program.model";

@Injectable({providedIn:'root'})
export class ProgramService {
  //private readonly API_URL = environment.API_URL;
  private readonly API_URL = 'http://localhost:3003/api/v1';

  constructor(private http: HttpClient) {
  }

  get = () => this.http.get<Program[]>(`${this.API_URL}/programs`);

  getById = (id:number) => this.http.get<Program>(`${this.API_URL}/programs/`+id);

  post = (program: Program) => this.http.post(`${this.API_URL}/programs`, program);

  update = (id: number, program: Program) => this.http.put(`${this.API_URL}/programs/`+id, program);

  delete = (id: number) => this.http.delete(`${this.API_URL}/programs/`+id);

}
