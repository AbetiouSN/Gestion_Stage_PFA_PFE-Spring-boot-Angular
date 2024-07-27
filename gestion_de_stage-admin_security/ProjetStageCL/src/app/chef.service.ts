
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { chef } from './model/chef.model';
import { AuthService } from './Componenets/home/auth.service';



@Injectable({
  providedIn: 'root',
})
export class chefService {
  private baseURL = "http://localhost:8080/api/cheffiliere";

  constructor(private httpClient: HttpClient,private authser:AuthService) { }

  createChef(Chef:chef) : Observable<Object>{
    return this.httpClient.post(` http://localhost:8080/api/v1/auth/registerChefFiliere`,Chef);

  }
  getInformationsClasses(): Observable<chef[]> {
    const headers = this.authser.getHeaders();
     
    return this.httpClient.get<chef[]>(`${this.baseURL}/afficherChefFilieres`,{headers:headers});
  }


  update(id:number,chef:chef):Observable<Object>{
    const headers = this.authser.getHeaders();
  return this.httpClient.put(`${this.baseURL}/updateChefFiliere/${id}`,chef,{headers:headers});
}



  getChefById(id:number):Observable<chef>{
    return this.httpClient.get<chef>(`${this.baseURL}/afficherChefFiliere/${id}`);
  }
  deleteChef(id: number): Observable<Object> {
    const headers = this.authser.getHeaders();
    return this.httpClient.delete(`${this.baseURL}/deleteChefFiliere/${id}`,{headers:headers});
  }
}