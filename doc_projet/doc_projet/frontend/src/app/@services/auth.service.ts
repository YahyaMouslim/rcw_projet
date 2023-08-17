import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserCredentials} from "../@core/models/user-credentials.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {User} from "../@core/models/user.model";

@Injectable({providedIn:'root'})
export class AuthService {
  private readonly API_URL = environment.API_URL;

  constructor(private http : HttpClient) {
  }

  authenticate(credentials:UserCredentials){
    return this.http.post(`${this.API_URL}/login`,credentials);
  }

  successLoggedIn(token : string){
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedin', 'true');
  }

  register(user:any){
    return this.http.post(`${this.API_URL}/register`,user);
  }

  delete(id:any){
    return this.http.delete(`${this.API_URL}/auth/`+id);
  }

  getProfessors() {
    return this.http.get<User[]>(`${this.API_URL}/instructors`);
  }

  getDirecteur() {
    return this.http.get<User[]>(`${this.API_URL}/directeur`);
  }

  getEtudiant() {
    return this.http.get<User[]>(`${this.API_URL}/etudiant`);
  }

  getByID(id:any) {
    return this.http.get<User>(`${this.API_URL}/users/`+id);
  }
}
