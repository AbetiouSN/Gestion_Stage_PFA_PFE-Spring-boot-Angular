import { Component } from '@angular/core';
import {  EncadrantService  } from './encadrant.service';
import { OnInit } from '@angular/core';
import {encadrant} from "./model/encadrant.model";
import {user} from "./model/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>Créer un compte pour l'encadrant </h1>
      </div>

      <div mat-dialog-content>

        <div *ngIf="saveSuccess">
          <p style="color: brown;"> Encadrant ajoute par succes </p>
        </div>

        <div class="row">

          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput type="text" [(ngModel)]="encadrant.nom">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Prenom</mat-label>
            <input matInput type="text" [(ngModel)]="encadrant.prenom">
          </mat-form-field>

        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>numero telephone</mat-label>
            <input matInput type="numero" [(ngModel)]="encadrant.tele">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Departement</mat-label>
            <mat-select [(ngModel)]="encadrant.departement">
              <mat-option value="INFORMATIQUE">INFORMATIQUE</mat-option>
              <mat-option value="FINANCE"> FINANCE</mat-option>
              <mat-option value="ELECTRIQUE">ELECTRIQUE</mat-option>
              <mat-option value="RESEAUX"> RESEAUX</mat-option>
              <mat-option value="MATHS_APPL">MATHS_APPL</mat-option>

            </mat-select>
          </mat-form-field>
        </div>
        <div class="row">

          <mat-form-field appearance="outline">
            <mat-label>email</mat-label>
            <input matInput type="email" [(ngModel)]="user.email">
          </mat-form-field>


          <mat-form-field appearance="outline">
            <mat-label>password</mat-label>
            <input matInput type="password" [(ngModel)]="user.password">
          </mat-form-field>


        </div>
        <div class="row">

<mat-form-field appearance="outline">
  <mat-label>Role</mat-label>
 
  <mat-select [(ngModel)]="encadrant.user.role">
  <mat-option value="ENCADRANT">ENCADRANT</mat-option>

  </mat-select>

</mat-form-field>





        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="black"(click)="onSubmit()">Save</button>
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
export class AppCreate2Component implements OnInit {

  encadrant: encadrant = new encadrant();
  user: user = new user();
  saveSuccess: boolean = false;

  constructor(private encadrantService: EncadrantService, private router: Router) {
  }

  ngOnInit(): void {
    this.encadrant.user = this.user;
    this.encadrant.user.role ='ENCADRANT';
  }

  saveEtudiant() {
    this.encadrantService.createEncadrant(this.encadrant).subscribe(
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

    console.log(this.encadrant)
    this.saveEtudiant();

  }
}
