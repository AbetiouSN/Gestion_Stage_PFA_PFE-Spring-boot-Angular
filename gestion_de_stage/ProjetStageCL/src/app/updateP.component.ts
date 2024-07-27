import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from './poste.service';
import { post } from './model/post.model';
import { Entreprise } from './model/entreprise.model';
import { user } from './model/user.model';

@Component({
    selector: 'updateP-component',
    template: `
        <div class="dv1">
    <div mat-dialog-title>
        <h1>Modifier le profil</h1>
    </div>
    <div mat-dialog-content>
        <div *ngIf="Success">
            <p style="color: brown;">Profil modifié avec succès</p>
        </div>
        <div class="row">
            <mat-form-field appearance="outline">
                <mat-label>Nom de l'entreprise</mat-label>
                <input matInput type="text" [(ngModel)]="entreprise.nom">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Adresse</mat-label>
                <input matInput type="text" [(ngModel)]="entreprise.address">
            </mat-form-field>
        </div>
        <div class="row">
            <mat-form-field appearance="outline" class="margin-right">
                <mat-label>Email RH</mat-label>
                <input matInput type="email" [(ngModel)]="entreprise.emailRH">
            </mat-form-field>
            <mat-form-field appearance="outline">
                <mat-label>Lien vers le site</mat-label>
                <input matInput type="text" [(ngModel)]="entreprise.lienSite">
            </mat-form-field>
        </div>
        <div class="row">
            <mat-form-field appearance="outline">
                <mat-label>Description</mat-label>
                <textarea matInput rows="5" [(ngModel)]="entreprise.description"></textarea>
            </mat-form-field>
        </div>
        <div class="button-container">
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
export class UpdatePComponent implements OnInit {
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
