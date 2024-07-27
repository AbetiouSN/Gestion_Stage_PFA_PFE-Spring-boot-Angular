import { Component } from '@angular/core';
import {  EntrepriseService  } from './entreprise.service';
import { OnInit } from '@angular/core';
import {Entreprise} from "./model/entreprise.model";
import {user} from "./model/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>Creer un partenariat</h1>
      </div>

      <div mat-dialog-content>

        <div *ngIf="saveSuccess">
          <p style="color: brown;"> Partenariat  ajoute par succes </p>
        </div>

        <div class="row">

          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput type="text" [(ngModel)]="Entreprise.nom">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Address</mat-label>
            <input matInput type="text" [(ngModel)]="Entreprise.address">
          </mat-form-field>

        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>email RH</mat-label>
            <input matInput type="email" [(ngModel)]="Entreprise.emailRH">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>lien de site</mat-label>
            <input matInput type="text" [(ngModel)]="Entreprise.lienSite">
          </mat-form-field>
        </div>
          <div class="row">

            <mat-form-field appearance="outline">
              <mat-label>descreption</mat-label>
              <input matInput type="text" [(ngModel)]="Entreprise.description">
            </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>password</mat-label>
            <input matInput type="password" [(ngModel)]="user.password">
          </mat-form-field>
        </div>

        <div class="row">


          <mat-form-field appearance="outline">
            <mat-label>email</mat-label>
            <input matInput type="email" [(ngModel)]="user.email">
          </mat-form-field>



        </div>




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
export class AppCreate4Component implements OnInit {

  Entreprise: Entreprise= new Entreprise();
  user: user = new user();
  saveSuccess: boolean = false;

  constructor(private entrepriseService: EntrepriseService, private router: Router) {
  }

  ngOnInit(): void {
    this.Entreprise.user = this.user;
    this.Entreprise.user.role = 'ENTREPRISE';
  }

  saveEtudiant() {
    this.entrepriseService.createEntreprise(this.Entreprise).subscribe(
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

    console.log(this.Entreprise)
    this.saveEtudiant();

  }


}
