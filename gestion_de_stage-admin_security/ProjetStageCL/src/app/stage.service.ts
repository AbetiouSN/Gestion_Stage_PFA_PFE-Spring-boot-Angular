import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stage } from './model/stage.model';
import { AuthService } from './Componenets/home/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private baseURL = "http://localhost:8080/api/stages";

  constructor(private httpClient: HttpClient , private authser:AuthService) { }

  createEtudiant(etudiant:stage): Observable<Object> {
    // Corrected the URL by enclosing it in quotes and fixing the path
    return this.httpClient.post(`${this.baseURL}/registerEtudiant`, etudiant);
  }

  getStages(IdEtu:number): Observable<stage[]> {
    const headers = this.authser.getHeaders();
    return this.httpClient.get<stage[]>(`http://localhost:8080/api/stages/stagebyEtu/${IdEtu}`,{headers:headers});
  }


  updateEtudiant(id:number,etudiant:stage):Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/modifyEtudiant/${id}`,etudiant);
  }
  getPostById(id:number):Observable<stage>{
    return this.httpClient.get<stage>(`${this.baseURL}/all/${id}`);
  }
  deleteEtudiant(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/deleteEtudiant/${id}`);
  }



  AfficheCondidat(Idpost:number): Observable<stage[]> {
    const headers = this.authser.getHeaders();
     
    return this.httpClient.get<stage[]>(`${this.baseURL}/condidat/${Idpost}`,{headers:headers});
  }

  ValiderStageEn(id: number): Observable<any> {
    const headers = this.authser.getHeaders();
    return this.httpClient.put(`http://localhost:8080/api/stages/validerEntreprise/${id}`, null, { responseType: 'text',headers:headers });
  }
  
  RefuserStage(id: number): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/refuserEntreprise/${id}`, null, { responseType: 'text' });
  }
  TelechargerCv(IdFichier:number):Observable<Blob>{
    const headers = this.authser.getHeaders();
    return this.httpClient.get(`http://localhost:8080/api/fichier/download/cv/${IdFichier}`,{  responseType: 'blob',headers:headers });

  }
  TelechargerLM(IdFichier:number):Observable<Blob>{
    const headers = this.authser.getHeaders();
    return this.httpClient.get(`http://localhost:8080/api/fichier/download/lettre/${IdFichier}`,{  responseType: 'blob',headers:headers });

  }
  ValiderEtudiant(id: number): Observable<any> {
    const headers = this.authser.getHeaders();
    return this.httpClient.put(`http://localhost:8080/api/stages/validerEntudaiant/${id}`, null, { responseType: 'text',headers:headers });
  }
  getStagesV(IdEtu:number): Observable<stage[]> {
    const headers = this.authser.getHeaders();
    return this.httpClient.get<stage[]>(`http://localhost:8080/api/stages/stageVparTous/${IdEtu}`,{headers:headers});
  }
  getStagesE(IdEnt:number): Observable<stage[]> {
    const headers = this.authser.getHeaders();
    return this.httpClient.get<stage[]>(` http://localhost:8080/api/stages/stagesV_ent/${IdEnt}`,{headers:headers});
  }

  

}
