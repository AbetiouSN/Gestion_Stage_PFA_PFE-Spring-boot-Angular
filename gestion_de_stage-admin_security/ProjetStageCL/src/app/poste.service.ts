import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {post} from './model/post.model'
import { AuthService } from './Componenets/home/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL = "http://localhost:8080/api/posts";

  constructor(private httpClient: HttpClient, private authser: AuthService) { }

  createpost(post:post): Observable<any> {
    const headers = this.authser.getHeaders();
    // Corrected the URL by enclosing it in quotes and fixing the path
    return this.httpClient.post(`http://localhost:8080/api/posts/register`, post,{headers:headers});
  }

 


  updatePost(id:number,post:post):Observable<any>{
    const headers = this.authser.getHeaders();
    return this.httpClient.put(`http://localhost:8080/api/posts/updtade/${id}`,post,{headers:headers});
  }
  getPostById(id:number):Observable<post>{
    const headers = this.authser.getHeaders();
    return this.httpClient.get<post>(`http://localhost:8080/api/posts/getPostById/${id}`,{headers:headers});
  }
  deleteEtudiant(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/deleteEtudiant/${id}`);
  }

  getPost(id:number): Observable<post[]> {
  
    const headers = this.authser.getHeaders();
    return this.httpClient.get<post[]>(`${this.baseURL}/all/${id}`,{headers:headers});
  }



  
colturer(id: number): Observable<any> {
  const headers = this.authser.getHeaders();
  return this.httpClient.put(`${this.baseURL}/closed/${id}`,post,{headers:headers});
}
getPostByfilliere(Filliere : string): Observable<post[]>{
  const headers = this.authser.getHeaders();
  // Corrected the URL by enclosing it in quotes and fixing the path
  return this.httpClient.get<post[]>(`http://localhost:8080/api/posts/filiere/${Filliere}`,{headers:headers});
}
postuller(file1:File,file2:File,idEt:number, idPost:number):Observable<any>{
  const formData = new FormData();
    formData.append('cvFile',file1);
    formData.append('motivationFile', file2);
    formData.append('etudiantId', idEt.toString());
    formData.append('postId', idPost.toString());
  
  
  const token = this.authser.getToken();
  const headers = new HttpHeaders({
    
   
    'Authorization': `Bearer ${token}`
  });

return this.httpClient.post(`http://localhost:8080/api/fichier/postuler`,formData,{headers:headers});

}
}
