import { Component, OnInit } from '@angular/core';
import { user } from './model/user.model';
import { chef } from './model/chef.model';
import { chefService } from './chef.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-compte',
  template: `
    <div class="dv1">
      <div mat-dialog-title>
        <h1>Modifier le compte d'un Chef filliere</h1>
      </div>
      <div mat-dialog-content>
        <!-- Vos champs de formulaire -->
        <div *ngIf="Success">
                    <p style="color: brown;"> cheffilliere modifier avec succes </p>
                </div>
        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput type="text" [(ngModel)]="chef.nom">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Prénom</mat-label>
            <input matInput type="text" [(ngModel)]="chef.prenom">
          </mat-form-field>
        </div>

        <div class="row">

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Téléphone</mat-label>
            <input matInput type="text" [(ngModel)]="chef.tele">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Fillière</mat-label>
            <mat-select [(ngModel)]="chef.filiere">
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
            <input matInput type="email" [(ngModel)]="chef.user.email">
          </mat-form-field>

          <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Mot de passe</mat-label>
            <input matInput type="password" [(ngModel)]="chef.user.password">
          </mat-form-field>
          
        </div>
        <div class="row">
        <mat-form-field appearance="outline" class="margin-right">
            <mat-label>Role</mat-label>
            <mat-select [(ngModel)]="chef.user.role">
              <mat-option value="CHEF_FILIERE">CHEF_FILIERE</mat-option>
            </mat-select>
          </mat-form-field>
          </div>

        <!-- D'autres champs en fonction de la structure de la classe Cheffilliere -->
        <!-- Adapter en conséquence -->
      </div>
      <div mat-dialog-actions class="button-container">
        <button mat-raised-button color="primary" (click)="onSubmit()">Modifier</button>
        <button mat-raised-button color="warn" (click)="goToChefList()">Annuler</button>
      </div>
    </div>
  `,
  styles: [`
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
  `]
})
export class UpdateChefComponent implements OnInit {
  id: number = 0;
  chef: chef = new chef();
  Success: boolean = false;
  user: user = new user();
  

  constructor(
    private chefservice: chefService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
  }

  onSubmit() {
    
    this.chefservice.update(this.id, this.chef).subscribe(
      data => {
        this.goToChefList();
        this.Success = true;
        console.log(data);
      },
      error => {
        console.log(error);
        
      }
    );
  }

  goToChefList() {
    this.router.navigate(['/admin/List3']);
  }
}
