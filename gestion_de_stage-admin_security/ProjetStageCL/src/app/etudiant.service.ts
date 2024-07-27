import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { etudiant } from "./model/etudiant.model";
import { AuthService } from './Componenets/home/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EtudiantService {
    private baseURL = "http://localhost:8080/api/Etudiant";

    constructor(private httpClient: HttpClient , private authser : AuthService) { }

    createEtudiant(etudiant: etudiant): Observable<Object> {
      const headers = this.authser.getHeaders();
        // Corrected the URL by enclosing it in quotes and fixing the path
        return this.httpClient.post(`http://localhost:8080/api/v1/auth/registerEtudiant`, etudiant,{headers:headers});
    }

    getEtudiants(): Observable<etudiant[]> {
      const headers = this.authser.getHeaders();
        return this.httpClient.get<etudiant[]>(`http://localhost:8080/api/Etudiant/afficherEtudiants`,{headers:headers});
    }


  updateEtudiant(id:number,etudiant:etudiant):Observable<Object>{
    const headers = this.authser.getHeaders();
    return this.httpClient.put(`http://localhost:8080/api/Etudiant/modifyEtudiant/${id}`,etudiant,{headers:headers});
  }
  getEtudiantById(id:number):Observable<etudiant>{
    const headers = this.authser.getHeaders();
    return this.httpClient.get<etudiant>(`${this.baseURL}/afficherEtudiant/${id}`,{headers:headers});
  }
    deleteEtudiant(id: number): Observable<Object>{
      const headers = this.authser.getHeaders();
        return this.httpClient.delete(`${this.baseURL}/deleteEtudiant/${id}`,{headers:headers});
    }
    getInfoetudiant(email: string): Observable<etudiant> {
      const headers = this.authser.getHeaders();
      // Utilisez des backticks (`) pour inclure la variable email dans l'URL
      return this.httpClient.get<etudiant>(`http://localhost:8080/api/Etudiant/findByUserEmail/${email}`,{headers: headers});
    }
    

}
