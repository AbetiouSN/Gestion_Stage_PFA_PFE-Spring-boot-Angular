import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { encadrant } from './model/encadrant.model'; // Import the Encadrant model
import { EncadrantService } from './encadrant.service'; // Import the Encadrant service
import { user } from './model/user.model';

@Component({
    selector: 'app-update-compte',
    template: `
        <div class="dv1">
            <div mat-dialog-title>
                <h1>Update an account For an encadrant </h1>
            </div>
            <div mat-dialog-content>
                <div *ngIf="Success">
                    <p style="color: brown;"> Encadrant modifié avec succès </p>
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
                        <mat-label>Numero telephone</mat-label>
                        <input matInput type="text" [(ngModel)]="encadrant.tele">
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
                        <mat-label>Password</mat-label>
                        <input matInput type="password" [(ngModel)]="user.password">
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="email" [(ngModel)]="user.email">
                    </mat-form-field>
                </div>

                <div class="row">
                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Role</mat-label>
                        <mat-select [(ngModel)]="user.role">
                            <mat-option value="ENCADRANT">ENCADRANT</mat-option>
                        </mat-select>
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
export class  Update2Component implements OnInit {
    id: number = 0;
    encadrant: encadrant = new encadrant(); // Update to match your actual class name
    user: user = new user();
    Success: boolean = false;

    constructor(private encadrantService: EncadrantService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {

        
        this.id = this.route.snapshot.params['id'];
        console.log(typeof (this.id));
        this.encadrantService.getEncadrantById(this.id).subscribe(
            (data) => {
                this.encadrant = data;
                this.encadrant.user=this.user;
                console.log(data);
            },
            (error) => console.log(error)
        );
    }

    onSubmit() {
        console.log(this.encadrant);

        this.encadrantService.updateEncadrant(this.id, this.encadrant).subscribe(
            (data) => {
                
                this.goToEncadrantList();
                this.Success = true;
                console.log(data);
            },
            (error) => console.log(error)
        );
    }

    goToEncadrantList() {

        this.router.navigate(['/admin/List2']);
    }
}
