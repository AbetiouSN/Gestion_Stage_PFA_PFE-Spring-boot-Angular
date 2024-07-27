import { Component, OnInit } from '@angular/core';
import { StageService } from './stage.service';
import { MatTableDataSource } from '@angular/material/table';
import { stage } from './model/stage.model';
import { AuthService } from './Componenets/home/auth.service';
import { EtudiantService } from './etudiant.service';
import { etudiant } from './model/etudiant.model';

@Component({
  selector: 'app-list',
  template: `
    <div class="mat-elevation-z8 tab">
      <table mat-table [dataSource]="dataSource" class="mat-table">

        <!-- Titre Column -->
        <ng-container matColumnDef="Sujet">
        
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Sujet</span></th>
          <td mat-cell *matCellDef="let element">{{element.sujet}}</td>
        </ng-container>
        <ng-container matColumnDef="typeStage">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Type de Stage</span></th>
          <td mat-cell *matCellDef="let element">{{element.niveau}}</td>
        </ng-container>
        <ng-container matColumnDef="Entreprise">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Entreprise</span></th>
          <td mat-cell *matCellDef="let element">{{element.entreprise.nom}}</td>
        </ng-container>

       

       
       

       

        <!-- Periode Column -->
        
        <!-- Actions Column -->
        <ng-container matColumnDef="Encadrant">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Encadrant</span></th>
          <td mat-cell *matCellDef="let element">{{element.encadrant.nom}}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [`
    .mat-table {
      width: 50%;
    }
    .tab {
      margin-top: 1.6cm;
      margin-left: 2cm;
      margin-right: 2cm;
    }
    .bold-blue {
      font-weight: bold;
      color: blue;
    }
  `]
})
export class StagesComponent  implements OnInit {
  displayedColumns: string[] = ['Sujet', 'typeStage', 'Entreprise', 'Encadrant'];
 
   etudiant : etudiant = new etudiant();
  dataSource = new MatTableDataSource<stage>(); // Utilisation de MatTableDataSource avec un tableau de stages

  constructor(private stageService:StageService,private authser:AuthService , private etuSer:EtudiantService ) { }

  ngOnInit(): void {
   
    const currentUser = this.authser.currentUser();
    
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.etuSer.getInfoetudiant(userEmail)
      .subscribe((response) => {
        
        console.log(response);
      
       this.etudiant.id = response.id;
       this.loadStage();
    })}
  }

  loadStage() {
    this.stageService.getStagesV( this.etudiant.id).subscribe(
      (data: stage[]) => {
        this.dataSource.data = data; // Affectation des données récupérées au MatTableDataSource
      },
      error => {
        console.log(error);
      }
    );
  }

  valider(id: number) {
    this.stageService.ValiderEtudiant(id).subscribe(
      data => {
        console.log("add data from API",data);
      },
      error =>{
        console.log('Error from API:',error);
      }
      );
    }
    // Implement your validation logic here
    
}

