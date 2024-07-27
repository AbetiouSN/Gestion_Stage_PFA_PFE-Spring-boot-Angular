import { Component } from '@angular/core';
import {  EncadrantService  } from './encadrant.service';
import { OnInit } from '@angular/core';
import {encadrant} from "./model/encadrant.model";
import {user} from "./model/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'up-etu-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>mettre a jour votre compte</h1>
      </div>

      <div mat-dialog-content>



        <div class="row">

          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput type="text">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Prenom</mat-label>
            <input matInput type="text">
          </mat-form-field>

        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>numero telephone</mat-label>
            <input matInput type="numero" >
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>email</mat-label>
            <input matInput type="email">
          </mat-form-field>
        </div>
        <div class="row">



          <mat-form-field appearance="outline">
            <mat-label>password</mat-label>
            <input matInput type="password" >
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>confirmer password</mat-label>
            <input matInput type="password" >
          </mat-form-field>

        </div>





        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="black">Enregistrer les changement</button>

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
export class UpdateEtuComponent  {


}
