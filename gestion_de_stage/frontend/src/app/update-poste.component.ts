import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from './poste.service';
import { post } from './model/post.model';
import { Entreprise } from './model/entreprise.model';
import { user } from './model/user.model';

@Component({
    selector: 'app-update-compte',
    template: `
        <div class="dv1">
            <div mat-dialog-title>
                <h1>Modier un poste</h1>
            </div>
            <div mat-dialog-content>
                <div *ngIf="Success">
                    <p style="color: brown;"> Poste modifier avec succes </p>
                </div>
                <div class="row">
                    <mat-form-field appearance="outline">
                        <mat-label>Designation</mat-label>
                        <input matInput type="text" [(ngModel)]="post.designation">
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                        <mat-label>Mission</mat-label>
                        <input matInput type="text" [(ngModel)]="post.mission">
                    </mat-form-field>
                    </div>
                    <div class="row">
                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Skile 1</mat-label>
                        <input matInput type="text" [(ngModel)]="post.skile1">
                    </mat-form-field>



                    <mat-form-field appearance="outline">
                        <mat-label>Skile 2</mat-label>
                        <input matInput type="numero" [(ngModel)]="post.skile2">
                    </mat-form-field>
                    </div>
                    <div class="row">
                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Skile 3</mat-label>
                        <input matInput type="text" [(ngModel)]="post.skile3">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="margin-right">
                        <mat-label>Filiere Concerne</mat-label>
                        <mat-select [(ngModel)]="post.filiere">
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
                    <mat-label>Type</mat-label>
                        <mat-select [(ngModel)]="post.typeStage">
                            <mat-option value="PFE">PFE</mat-option>
                            <mat-option value="PFA">PFA</mat-option>

                        </mat-select>
                    </mat-form-field>



                    <mat-form-field appearance="outline">
                        <mat-label>Date de debut</mat-label>
                        <input matInput type="text" [(ngModel)]="post.date_debut">
                    </mat-form-field>
                    </div>
                    <mat-form-field appearance="outline">
                        <mat-label>Date de fin</mat-label>
                        <input matInput type="text" [(ngModel)]="post.date_fin">
                    </mat-form-field>




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
export class UpdatePostComponent implements OnInit {
    id: number = 0;
    post: post = new post();
    entreprise:Entreprise = new Entreprise() ;
  user:user=new user();
    Success: boolean = false;
    constructor(private postService: PostService, private router: Router, private route: ActivatedRoute,) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params["id"];
        this.postService.getPostById(this.id).subscribe(data => {
            this.post = data;
            this.user.email=data.idEntreprise.user.email;
            this.user.role=data.idEntreprise.user.role;
            
            this.post.idEntreprise.user=this.user;
            console.log(data.idEntreprise.user);
        }, error => console.log(error));

    }



    onSubmit() {

        this.postService.updatePost(this.id, this.post).subscribe(data => {
            console.log(this.post);
            // this.goToEtudiantList();
            this.Success = true;
            console.log(data);
        }
            , error => console.log(error));
    }
    // goToEtudiantList(){
    //     this.router.navigate(['/admin/List']);
    //}

}
