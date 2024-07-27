import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Entreprise } from "./model/entreprise.model";
import { AuthService } from './Componenets/home/auth.service';

@Injectable({
  providedIn: 'root'
})

export class EntrepriseService {
  
  private baseURL = "http://localhost:8080/api/entreprise";
  constructor(private httpClient:HttpClient , private authser: AuthService) { }

  createEntreprise(entreprise:Entreprise) : Observable<Object>{
    return this.httpClient.post(`http://localhost:8080/api/v1/auth/registerEntreprise`,entreprise);

  }
  getEntreprises(): Observable<Entreprise[]> {
    const headers = this.authser.getHeaders();
    return this.httpClient.get<Entreprise[]>(`http://localhost:8080/api/entreprise/afficherEntreprise`,{headers: headers});
  }
  updateEntreprise(id:number,entreprise:Entreprise):Observable<Object>{
    const headers = this.authser.getHeaders();
    return this.httpClient.put(`${this.baseURL}/editEntreprise/${id}`,entreprise,{headers: headers});
  }
  getEntrepriseById(id:number):Observable<Entreprise>{
    return this.httpClient.get<Entreprise>(`${this.baseURL}/afficherEntreprise/${id}`);
  }
  deleteEntreprise(id: number): Observable<Object>{
    const headers = this.authser.getHeaders();
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`,{headers: headers});
  }
  
  getInfoentreprise(email: string): Observable<Entreprise> {
    const headers = this.authser.getHeaders();
    // Utilisez des backticks (`) pour inclure la variable email dans l'URL
    return this.httpClient.get<Entreprise>(`http://localhost:8080/api/entreprise/findByUserEmail/${email}`,{headers: headers});
  }
 
}
