import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { post } from './model/post.model';
import { PostService } from './poste.service';
import { Router } from '@angular/router';
import { EntrepriseService } from './entreprise.service';
import { AuthService } from './Componenets/home/auth.service';
import { Entreprise } from './model/entreprise.model';
@Component({
  selector: 'app-Ajout-Poste',
  template: `
  <div class="dv1">
      <div mat-dialog-title>
        <h1>Créer un poste</h1>
      </div>

      <div mat-dialog-content>

        <div *ngIf="saveSuccess">
          <p style="color: brown;">Le poste a été ajouté avec succès</p>
        </div>

        <div class="row">
          

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Désignation:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.designation">
          </mat-form-field>
        

        <!-- Autres champs similaires liés à ngModel -->

        
          <mat-form-field appearance="outline">
            <mat-label>Compétence 1:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.skile1">
          </mat-form-field>
          </div>
          <div class="row">
          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Compétence 2:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.skile2">
          </mat-form-field>
       

        <!-- Autres champs similaires liés à ngModel -->

        
          <mat-form-field appearance="outline">
            <mat-label>Compétence 3:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.skile3">
          </mat-form-field>
          </div>
          <div class="row">
         
            <mat-form-field appearance="outline" >
        <mat-label>Filliere</mat-label>
        <mat-select [(ngModel)]="poste.filiere">
              <mat-option value="GINF">GINF</mat-option>
              <mat-option value="GSTR">GSTR</mat-option>
              <mat-option value="GSEA">GSEA</mat-option>
              <mat-option value="G3EI">G3EI</mat-option>
              <mat-option value="GIL">GIL</mat-option>
            </mat-select>
          </mat-form-field>
       

        <!-- Autres champs similaires liés à ngModel -->

        

            <mat-form-field appearance="outline" >
        <mat-label>Type stage </mat-label>
        <mat-select [(ngModel)]="poste.typeStage">
              <mat-option value="PFA">PFA</mat-option>
              <mat-option value="PFE">PFE</mat-option>
            
            </mat-select>
          </mat-form-field>
         
          </div>
          <div class="row">
          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Date de début:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.date_debut">
          </mat-form-field>
       

        <!-- Autres champs similaires liés à ngModel -->

       
          <mat-form-field appearance="outline">
            <mat-label>Date de fin:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.date_fin">
          </mat-form-field>
          </div>
          <div class="row">
          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Mission:</mat-label>
            <input matInput type="text" [(ngModel)]="poste.mission">
          </mat-form-field>
        </div>

        <!-- Autres champs similaires liés à ngModel -->

        

        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="primary" (click)="onSubmit()">Ajouter</button>
          <button mat-raised-button color="warn">Annuler</button>
        </div>
      </div>
    </div>

  `,
  styles: `
    .dv1 {
      border: 2px solid #fff;
      padding: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    .margin-right {
      margin-right: 10px;
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }


  `,
})
export class AjoutPosteComponent {
  poste: post = new post(); 
  
  entreprise :Entreprise = new Entreprise();
   
  saveSuccess: boolean = false;
  constructor(private postService: PostService,private authser :AuthService , private entser:EntrepriseService ,private router: Router) {}
 
  ngOnInit(): void {
    const currentUser = this.authser.currentUser();
    
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.entser.getInfoentreprise(userEmail)
      .subscribe((response) => {
        
        console.log(response);
      
       this.entreprise.id = response.id;
       
        this.entreprise.address = response.address;
       this.entreprise.emailRH = response.emailRH;
        this.entreprise.lienSite = response.lienSite;
       this.entreprise.description = response.description;
        
        // Remplissage des détails de l'utilisateur de l'entreprise
        this.entreprise.user.email = response.user.email;
        this.entreprise.user.role = response.user.role;
       
        this.poste.idEntreprise=this.entreprise;
          
        });
    } else {
     
      console.error("L'e-mail de l'utilisateur est indéfini.");
    }
    
   
  }
    
   
  
  savePost() {
    this.postService.createpost(this.poste).subscribe(
      data => {
        console.log(data);
        this.saveSuccess = true;
      },
      error => {
        console.error('Error creating post:', error);
      }
    );
  }
  onSubmit() {
    if (this.poste) {
      // Manipuler les données du postModel ici après la soumission du formulaire
      console.log(this.poste);
      // Envoyer les données, effectuer des opérations, etc.
      this.savePost();
    }}
    

    
  
    
      
     
    
  
    
    
  
   
  
    // Not sure why you have this line, but I kept it in case it's needed
   
  }


  