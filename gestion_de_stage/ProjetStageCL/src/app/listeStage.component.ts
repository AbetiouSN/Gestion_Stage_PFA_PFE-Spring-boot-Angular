import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { stage } from './model/stage.model';
import { PostService } from './poste.service';
import { Route, Router } from '@angular/router';
import { StageService } from './stage.service';
import { AuthService } from './Componenets/home/auth.service';
import { Entreprise } from './model/entreprise.model';
import { EntrepriseService } from './entreprise.service';

@Component({
  selector: 'app-liste-stage',
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <!-- Positionnement des colonnes -->
      <ng-container matColumnDef="sujet">
        <th mat-header-cell *matHeaderCellDef>Sujet</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.sujet }}
        </td>
      </ng-container>

      <ng-container matColumnDef="dateDebut">
        <th mat-header-cell *matHeaderCellDef>Date de début</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.dateDebut  }}
        </td>
      </ng-container>

      <ng-container matColumnDef="dateFin">
        <th mat-header-cell *matHeaderCellDef>Date de fin</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.dateFin }}
        </td>
      </ng-container>

      <ng-container matColumnDef="filiere">
        <th mat-header-cell *matHeaderCellDef>Filière</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.filiere }}
        </td>
      </ng-container>

      <ng-container matColumnDef="niveau">
        <th mat-header-cell *matHeaderCellDef>Niveau</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.niveau }}
        </td>
      </ng-container>

      <!-- <ng-container matColumnDef="validEntrep">
        <th mat-header-cell *matHeaderCellDef>Valid. Entreprise</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.validEntrep ? 'Validé' : 'En attente' }}
        </td>
      </ng-container> -->

      <ng-container matColumnDef="validEtud">
        <th mat-header-cell *matHeaderCellDef>Valid. Étudiant</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.validEtud ? 'Validé' : 'En attente' }}
        </td>
      </ng-container>

      <ng-container matColumnDef="validChef">
        <th mat-header-cell *matHeaderCellDef>Valid. Chef</th>
        <td mat-cell *matCellDef="let stage" [ngStyle]="getRowColor(stage)">
          {{ stage.validChef ? 'Validé' : 'En attente' }}
        </td>
      </ng-container>

      <!-- Ajoutez d'autres colonnes selon vos besoins -->

      <tr mat-header-row *matHeaderRowDef="['sujet', 'dateDebut', 'dateFin', 'filiere', 'niveau','validEtud', 'validChef']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['sujet', 'dateDebut', 'dateFin', 'filiere', 'niveau','validEtud', 'validChef'];" [ngStyle]="getRowColor(row)"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})

export class ListeStageComponent implements OnInit {
  dataSource = new MatTableDataSource<stage>(); // Utilisation de MatTableDataSource avec un tableau de stages
entreprise : Entreprise = new Entreprise();
  constructor(private stageService: StageService, private router: Router , private authser:AuthService , private entSer:EntrepriseService) { }

  ngOnInit(): void {
     
    const currentUser = this.authser.currentUser();
      
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.entSer.getInfoentreprise(userEmail)
      .subscribe((response) => {
        
        console.log(response);
      
       this.entreprise.id = response.id;
    this.loadStage();
  })}else {
       
    console.error("L'e-mail de l'utilisateur est indéfini.");
  }
}
    
  loadStage() {
    this.stageService.getStagesE(this.entreprise.id).subscribe(
      (data: stage[]) => {
        console.log(data);
        this.dataSource.data = data; // Affectation des données récupérées au MatTableDataSource
      },
      error => {
        console.log(error);
      }
    );
  }

  getRowColor(stage: stage): { [key: string]: string } {
    let rowColor = '';

    if (stage.validEntrep && stage.validEtud && stage.validChef) {
      rowColor = 'skyblue'; // Toutes les validations sont réussies
    } else if (stage.validEntrep || stage.validEtud || stage.validChef) {
      rowColor = 'honeydew'; // Au moins une validation est réussie
    } else {
      rowColor = ''; // Aucune validation
    }

    return { 'background-color': rowColor };
  }
}

