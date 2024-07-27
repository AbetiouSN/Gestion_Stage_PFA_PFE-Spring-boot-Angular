import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Entreprise } from './model/entreprise.model';
import {EntrepriseService} from "./entreprise.service";
import { user } from './model/user.model';

@Component({
  selector: 'app-update-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>Update an account For an entreprise</h1>
      </div>
      <div mat-dialog-content>
        <div *ngIf="Success">
          <p style="color: brown;"> Entreprise modifié avec succès </p>
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
            <mat-label>email rh</mat-label>
            <input matInput type="email" [(ngModel)]="Entreprise.emailRH">
          </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>lien site</mat-label>
                <input matInput type="email" [(ngModel)]="Entreprise.lienSite">
            </mat-form-field>

        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput type="password" [(ngModel)]="user.password">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" [(ngModel)]="Entreprise.user.email">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Role</mat-label>
            <mat-select [(ngModel)]="Entreprise.user.role">
              <mat-option value="ENTREPRISE">Entreprise</mat-option>
            </mat-select>
          </mat-form-field>

            <mat-form-field appearance="outline">
                <mat-label>descreption</mat-label>
                <input matInput type="text" [(ngModel)]="Entreprise.description">
            </mat-form-field>



        </div>

        <div mat-dialog-actions class="button-container">
          <button mat-raised-button color="primary" (click)="onSubmit()">Modifier</button>
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
export class UpdateEntrepriseComponent implements OnInit {
  id: number = 0;
  Entreprise:Entreprise = new Entreprise(); // Update to match your actual class name
  user: user = new user();
  Success: boolean = false;

  constructor(private entrepriseService: EntrepriseService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.Entreprise.user = this.user;
    this.id = this.route.snapshot.params['id'];
    console.log(typeof (this.id));
    this.entrepriseService.getEntrepriseById(this.id).subscribe(
      (data) => {
        this.Entreprise = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {

    this.entrepriseService.updateEntreprise(this.id, this.Entreprise).subscribe(
      (data) => {
        this.goToEntrepriseList();
        this.Success = true;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  goToEntrepriseList() {

    this.router.navigate(['/admin/List4']);
  }


}
