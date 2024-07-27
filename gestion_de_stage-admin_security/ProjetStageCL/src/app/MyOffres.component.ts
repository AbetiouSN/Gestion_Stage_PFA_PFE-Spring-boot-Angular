import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { PostService } from './poste.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { post } from './model/post.model';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from './entreprise.service';
import { AuthService } from './Componenets/home/auth.service';
import { Entreprise } from './model/entreprise.model';

@Component({
  selector: '',
  template: `
    <button mat-button
            style="margin-top: 1cm; background-color: #9b42f1; color: white; margin-left: 1cm; font-size: large; font-weight: bold; padding-left: 1cm; padding-right: 1cm"
            (click)="goTo('ajoutPoste')">
      Ajouter...
    </button>
    <div class="mat-elevation-z8 tab">

      <table mat-table [dataSource]="dataSource" class="mat-table">

        <ng-container matColumnDef="reference">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Référence</span></th>
          <td mat-cell *matCellDef="let element">{{element.id}}</td>
        </ng-container>

        <ng-container matColumnDef="intitule">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">designation</span></th>
          <td mat-cell *matCellDef="let element">{{element.designation}}</td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">filiere</span></th>
          <td mat-cell *matCellDef="let element">{{element.filiere}}</td>
        </ng-container>

      



        <ng-container matColumnDef="cloture">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Clôture</span></th>
          <td mat-cell *matCellDef="let element">


          <div *ngIf="!element.cloture">
            <button mat-icon-button color="primary" (click)="cloture(element.id)">
            <mat-icon>done</mat-icon>
            </button>
          </div>

          <div *ngIf="element.cloture">
             <button mat-icon-button color="warn">
             <mat-icon>clear</mat-icon>
              </button>
          </div>


          </td>
        </ng-container>

        <ng-container matColumnDef="details">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Détails</span></th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="desc(element.id)">
              <mat-icon>visibility</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: `
    .mat-table {
      margin-top: 1cm;
    }

    .actions-buttons {
      display: flex;
    }

    .actions-buttons button {
      margin-right: 5px;
    }
    .colture-text {
  color: brown;
}

.actions-buttons button {
  margin-right: 5px;
}

.actions-buttons button.ng-hide {
  display: none;
}
  `,
})
export class MyOffresComponent implements OnInit{
  entreprise : Entreprise = new Entreprise();
  //colture : boolean=false;
  constructor(private router: Router, private postService: PostService,private entSer:EntrepriseService, private authser:AuthService) {

  }

  ngOnInit(): void {
    
    
      const currentUser = this.authser.currentUser();
      
      const userEmail = currentUser?.email;
      console.log(userEmail)
      
      if (currentUser && userEmail) {
        this.entSer.getInfoentreprise(userEmail)
        .subscribe((response) => {
          
          console.log(response);
        
         this.entreprise.id = response.id;
         
          this.entreprise.address = response.address;
         this.entreprise.emailRH = response.emailRH;
          this.entreprise.lienSite = response.lienSite;
         this.entreprise.description = response.description;
          
          // Remplissage des détails de l'utilisateur de l'entreprise
          this.entreprise.user.email = response.user.email;
          this.entreprise.user.role = response.user.role;
          this.Afficherposts();
        
            
          });
      } else {
       
        console.error("L'e-mail de l'utilisateur est indéfini.");
      }
      
     
    
      
   
  }
  dataSource = new MatTableDataSource<post>([]);

  displayedColumns = ['reference', 'intitule', 'date', 'cloture','details'];

  goTo(route: string) {
    this.router.navigate(['/entreprise', route]);
  }
  desc(id:number) {
    this.router.navigate(['/entreprise','description',id]);
  }

  Afficherposts() {
    
    this.postService.getPost(this.entreprise.id).subscribe(
      (data: post[]) => {
        this.dataSource.data = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  cloture(id: number) {
    this.postService.colturer(id).subscribe(
      (data: any) => {
       
        
          //this.colture = true;
       
        
      },
      (error: any) => {
        console.error('Error in parsing response:', error);
        // Handle the error as needed
      }
    );
  }
  
  
    
}

  


