import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { chefService } from './chef.service';
import { user } from './model/user.model';
import {chef} from "./model/chef.model";
@Component({
  selector: 'app-creer-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>Create an ACCOUNT CHEF</h1>
      </div>

      <div mat-dialog-content>
      <div *ngIf="saveSuccess">
  <p style="color: brown;"> chef filiere est ajouté avec succes </p>
</div>
        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput type="text" [(ngModel)]="Chef.nom">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Prenom</mat-label>
            <input matInput type="text" [(ngModel)]="Chef.prenom">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>numero de telephone</mat-label>
            <input matInput type="numero" [(ngModel)]="Chef.tele">
</mat-form-field>


        <mat-form-field appearance="outline" >
        <mat-label>Filliere</mat-label>
        <mat-select [(ngModel)]="Chef.filiere">
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
            <input matInput type="Email" [(ngModel)]="User.email">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Pssword</mat-label>
            <input matInput type="password" [(ngModel)]="User.password">
          </mat-form-field>
          </div>
          <div class="row">

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Role</mat-label>
            <mat-select [(ngModel)]="User.role">
              <mat-option value=" CHEF_FILIERE"> CHEF_FILIERE</mat-option>


            </mat-select>
          </mat-form-field>
        </div>





        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="primary" (click)="onSubmit()">Save</button>
          <button mat-raised-button color="warn">Cancel</button>
    
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
export class AppCreate3Component implements OnInit {
  Chef: chef = new chef();
  User: user = new user();

  saveSuccess: boolean = false;

  constructor(private chefService: chefService, private router: Router) {}

  ngOnInit(): void {
    // Create a new instance of user and assign it to Chef.user
    this.Chef.user = this.User;
    this.Chef.user.role="CHEF_FILIERE";
  }

  saveChef() {
    this.chefService.createChef(this.Chef).subscribe(
      data => {
        console.log(data);
        this.saveSuccess = true;
      },
      error => {
        console.error('Error creating chef:', error);
      }
    );
  }

  onSubmit() {
    console.log('JSON envoyé au serveur :', this.Chef);
    console.log(this.Chef);
    this.saveChef();
  }

  // Not sure why you have this line, but I kept it in case it's needed
  protected readonly chef = chef;
}