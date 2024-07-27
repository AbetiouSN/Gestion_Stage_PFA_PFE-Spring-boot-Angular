import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { etudiant } from './model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { user } from './model/user.model';
@Component({
    selector: 'app-update-compte',
    template: `
        <div class="dv1">
            <div mat-dialog-title>
                <h1>Update an account For a student </h1>
            </div>
            <div mat-dialog-content>
                <div *ngIf="Success">
                    <p style="color: brown;"> Etudiant modifier avec succes </p>
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

                    <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="Email" [(ngModel)]="user.email">
                    </mat-form-field>


                </div>
                <div class="row">
                    <mat-form-field appearance="outline">
                        <mat-label>Pssword</mat-label>
                        <input matInput type="password" [(ngModel)]="user.password">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Role</mat-label>
                        <mat-select [(ngModel)]="user.role">
                            <mat-option value="ETUDIANT">ETUDIANT</mat-option>


                        </mat-select>
                    </mat-form-field>
                </div>
                <div class="row">
                    <mat-form-field appearance="outline">
                    <mat-label>Filliere</mat-label>
                        <mat-select [(ngModel)]="etudiant.filiere">
                            <mat-option value="GINF">GINF</mat-option>
                            <mat-option value="GIL">GIL</mat-option>
                            <mat-option value="GSTR">GSTR</mat-option>
                            <mat-option value="GSEA">GSEA</mat-option>
                            <mat-option value="G3EI">G3EI</mat-option>

                           
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
export class UpdateComponent implements OnInit{
    id:number=0;
    etudiant:etudiant=new etudiant();
    user : user=new user;
    Success: boolean = false;
    constructor(private etudiantService:EtudiantService ,private router:Router, private route: ActivatedRoute,){}

    ngOnInit(): void {
       
      
        this.id=this.route.snapshot.params['id'];
     

    }



    onSubmit(){
        
        this.etudiant.id=this.id;
        console.log(this.etudiant);
        this.etudiant.user=this.user;

        this.etudiantService.updateEtudiant(this.id, this.etudiant).subscribe( data =>{
                this.goToEtudiantList();
                this.Success=true;
                console.log(data);
                console.log(this.etudiant);
                
            }
            , error => console.log(error));
    }
    goToEtudiantList(){
        this.router.navigate(['/admin/List']);
    }

}
