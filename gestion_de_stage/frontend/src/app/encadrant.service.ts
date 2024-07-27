import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { encadrant } from "./model/encadrant.model";
import {etudiant} from "./model/etudiant.model";
import { AuthService } from './Componenets/home/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EncadrantService {
    private baseURL = "http://localhost:8080/encadrants";

    constructor(private httpClient: HttpClient,private authser:AuthService) { }

    createEncadrant(encadrant: encadrant): Observable<Object> {
        const headers = this.authser.getHeaders();
        // Corrected the URL by enclosing it in quotes and fixing the path
        return this.httpClient.post(`http://localhost:8080/api/v1/auth/registerEncadrant`, encadrant,{headers:headers});
    }

    getEncadrant(): Observable<encadrant[]> {
        const headers = this.authser.getHeaders();
        return this.httpClient.get<encadrant[]>(`http://localhost:8080/encadrants/afficherEncadrants`,{headers:headers});
    }






    updateEncadrant(id: number, encadrant: encadrant): Observable<Object> {
        const headers = this.authser.getHeaders();
        // Utilisez le bon format d'URL en utilisant l'ID fourni
        return this.httpClient.put(`${this.baseURL}/updateEncadrant/${id}`, encadrant,{headers:headers});
    }
    getEncadrantById(id: number): Observable<encadrant> {
        const headers = this.authser.getHeaders();
        return this.httpClient.get<encadrant>(`http://localhost:8080/encadrants/afficherEncadrant/${id}`,{headers:headers});
    }

  deleteEncadrant(id: number): Observable<any>{
    const headers = this.authser.getHeaders();
    return this.httpClient.delete(`${this.baseURL}/supprimer/${id}`,{headers:headers});
  }




}
