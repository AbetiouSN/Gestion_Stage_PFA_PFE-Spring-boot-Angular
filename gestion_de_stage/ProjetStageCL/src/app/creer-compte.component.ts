import { Component } from '@angular/core';
import { EtudiantService } from './etudiant.service';
import { OnInit } from '@angular/core';
import { etudiant } from "./model/etudiant.model";
import { user } from "./model/user.model";
import { Router } from '@angular/router';

@Component({
    selector: 'app-creer-compte',
    template: `
        <div class="dv1">
            <div mat-dialog-title>
                <h1>Créer un compte pour Etudiant</h1>
            </div>

            <div mat-dialog-content>
                <div *ngIf="saveSuccess">
                    <p style="color: brown;"> Etudiant ajouté par succes </p>
                </div>
                <div class="row">
                    <mat-form-field appearance="outline">
                        <mat-label>Nom</mat-label>
                        <input matInput type="text" [(ngModel)]="etudiant.nom">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Prenom</mat-label>
                        <input matInput type="text" [(ngModel)]="etudiant.prenom">
                    </mat-form-field>
                </div>

                <div class="row">
                    <mat-form-field appearance="outline">
                        <mat-label>numero telephone</mat-label>
                        <input matInput type="numero" [(ngModel)]="etudiant.tele">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>date de naissance</mat-label>
                        <input matInput type="text" [(ngModel)]="etudiant.dateNais">
                    </mat-form-field>
                </div>

                <div class="row">
                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Niveau</mat-label>
                        <mat-select [(ngModel)]="etudiant.niveau">
                            <mat-option value="CI1">CI1</mat-option>
                          <mat-option value="CI2">CI2</mat-option>
                            <mat-option value="CI3">CI3</mat-option>

                        </mat-select>
                    </mat-form-field>
                   


<mat-form-field appearance="outline" class="margin-right">
    <mat-label>Filiere</mat-label>
    <mat-select [(ngModel)]="etudiant.filiere">
        <mat-option value="GINF">GINF</mat-option>
        <mat-option value="GSTR">GSTR</mat-option>

        <mat-option value="GSEA">GSEA</mat-option>

        <mat-option value="G3EI">G3EI</mat-option>

        <mat-option value="GIL">GIL</mat-option>
      
      


    </mat-select>
</mat-form-field>
</div>
<div class="row">
                    <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="Email" [(ngModel)]="user.email">
                    </mat-form-field>


               
               
                    <mat-form-field appearance="outline">
                        <mat-label>Mot de passe</mat-label>
                        <input matInput type="password" [(ngModel)]="user.password">
                    </mat-form-field>

                </div>

                
        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="primary" (click)="onSubmit()">Save</button>
          <button mat-raised-button color="warn">Cancel</button>
    
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
export class AppCreateComponent implements OnInit {

    etudiant: etudiant = new etudiant();
    user: user = new user();
    saveSuccess: boolean = false;
    constructor(private etudiantService: EtudiantService, private router: Router) { }
    ngOnInit(): void {
        this.etudiant.user=this.user;
      this.etudiant.user.role='ETUDIANT';
    }

    saveEtudiant() {
        this.etudiantService.createEtudiant(this.etudiant).subscribe(
            data => {
                console.log(data);
                this.saveSuccess = true;
            },
            error => {
                console.log(error);
            }
        )
    }
    onSubmit() {

        console.log(this.etudiant)
        this.saveEtudiant();

    }
}
