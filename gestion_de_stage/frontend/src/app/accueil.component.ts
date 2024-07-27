import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { PostService } from './poste.service';
import { AuthService } from './Componenets/home/auth.service';
import { EtudiantService } from './etudiant.service';
import { etudiant } from './model/etudiant.model';

@Component({
  selector: 'acceuil-comp',
  template: `
    <div class="header">
      <div *ngFor="let jobPost of jobPosts">
        <div class="job-post-container">
          <div class="job-post">
            <h3>{{ jobPost.designation }}</h3>
            <p><strong>Mission:</strong> {{ jobPost.mission }}</p>
            <p><strong>Compétence 1:</strong> {{ jobPost.skile1 }}</p>
            <p><strong>Compétence 2:</strong> {{ jobPost.skile2 }}</p>
            <p><strong>Compétence 3:</strong> {{ jobPost.skile3 }}</p>
            <p><strong>Entreprise:</strong> {{ jobPost.idEntreprise.nom }}</p>
            <p><strong>Type de Stage:</strong> {{ jobPost.typeStage }}</p>
            <p><strong>DateDebut:</strong> {{ jobPost.date_debut }} </p>
            <p><strong>DateFin:</strong> {{ jobPost. date_fin  }}</p>
          </div>
          <button mat-button color="primary" (click)="postuller(jobPost.id)" class="postuler-button">Postuler</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .job-post-container {
        border: 1px solid #ddd; /* Solid border */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
        padding: 3cm; /* Adjust as needed */
        margin-bottom: 20px; /* Adjust as needed */
        position: relative;
      }

      .postuler-button {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    `,
  ],
})
export class AccueilComponent {
  etudiant:etudiant = new etudiant(); 
  constructor(private postSer:PostService ,private authser :AuthService , private etuser:EtudiantService ,private router: Router) {}
  jobPosts: any[] = [];
  
  ngOnInit(): void {
    const currentUser = this.authser.currentUser();
    
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.etuser.getInfoetudiant(userEmail)
      .subscribe((response) => {
        
        console.log(response);
      
       this.etudiant.id = response.id;
       this.etudiant.filiere=response.filiere;

       
        
        // Remplissage des détails de l'utilisateur de l'entreprise
        this.etudiant.user.email = response.user.email;
        this.etudiant.user.role = response.user.role;
       
        this.loadPost();
          
        });
    } else {
     
      console.error("L'e-mail de l'utilisateur est indéfini.");
    }
    
   
  }
  loadPost() {
    this.postSer.getPostByfilliere(this.etudiant.filiere).subscribe(
      (data) => {
        console.log(data);
        this.jobPosts = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  postuller(id: number) {
  
    this.router.navigate(['/Etudiant/postuler', id]);
  }
  goTo(route: string) {
    this.router.navigate(['/Etudiant', route]);
  }
}
