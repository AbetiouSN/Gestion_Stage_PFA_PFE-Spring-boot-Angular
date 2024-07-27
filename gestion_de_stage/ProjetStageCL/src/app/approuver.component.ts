
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

//import { Router } from '@angular/router';
import {etudiant} from "./model/etudiant.model";
import {user} from "./model/user.model";

import { stage } from './model/stage.model';
import { StageService } from './stage.service';


@Component({
    selector: 'app-approuver',
    template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef>Nom Candidat</th>
    <td mat-cell *matCellDef="let stageItem">
      {{ stageItem.etudiant && stageItem.etudiant.nom ? stageItem.etudiant.nom : 'N/A' }}
      {{ stageItem.etudiant && stageItem.etudiant.prenom ? stageItem.etudiant.prenom : 'N/A' }}
    </td>
  </ng-container>

  <ng-container matColumnDef="filiere">
    <th mat-header-cell *matHeaderCellDef>filiere</th>
    <td mat-cell *matCellDef="let stageItem">{{ stageItem.filiere }}</td>
  </ng-container>

  <ng-container matColumnDef="sujet">
    <th mat-header-cell *matHeaderCellDef>sujet</th>
    <td mat-cell *matCellDef="let stageItem">{{ stageItem.sujet }}</td>
  </ng-container>

  <ng-container matColumnDef="cv">
    <th mat-header-cell *matHeaderCellDef>CV</th>
    <td mat-cell *matCellDef="let stageItem">
      <a mat-button color="primary" (click)="generateDownload2Link(stageItem.fichier.id)" >
        Télécharger
      </a>
    </td>
  </ng-container>

  <ng-container matColumnDef="lettreMotivation">
    <th mat-header-cell *matHeaderCellDef>Lettre de Motivation</th>
    <td mat-cell *matCellDef="let stageItem">
      <a mat-button color="primary" (click)="generateDownload1Link(stageItem.fichier.id)">
        Télécharger
      </a>
    </td></ng-container>

  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef>Actions</th>
    <td mat-cell *matCellDef="let stageItem">
    <button mat-button color="primary" (click)="validerCandidat(stageItem.id)">Valider</button>
<button mat-button color="warn" (click)="refuserCandidat(stageItem.etudiant.id)">Refuser</button>
</td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="['id', 'cv', 'lettreMotivation', 'filiere', 'sujet', 'actions']"></tr>
  <tr mat-row *matRowDef="let row; columns: ['id', 'cv', 'lettreMotivation', 'filiere', 'sujet', 'actions'];"></tr>
</table>


  `,
    styles: 
        `
      table {
          margin-top: 1cm;
        width: 100%;
        border-collapse: collapse;
      }

      button {
        margin-right: 5px; /* Ajoute une marge entre les boutons */
        margin-right: 5px; /* Ajoute une marge entre les boutons */
        margin-bottom: 5px;
  }
  `,
})

export class ApprouverComponent implements OnInit {
  id:number=0;

    dataSource = new MatTableDataSource<stage>([]);
    displayedColumns = ['filiere', 'id', 'sujet','lettreMotivation','actions', 'cv'];
 
    constructor(private router: Router, private route: ActivatedRoute, private  ConService : StageService) {

    }
  

    ngOnInit(): void {
      this.id=this.route.snapshot.params['id'];
      this.afficheCandidat();
    }

   

   

    generateDownload1Link(fichierId: number): void {
      this.ConService.TelechargerLM(fichierId).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'cv.pdf'; // Remplacez par le nom de fichier approprié
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error => {
          console.error('Erreur lors du téléchargement du lettre de motivation', error);
        }
      );
    }
    generateDownload2Link(fichierId: number): void {
      this.ConService.TelechargerCv(fichierId).subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'lettreMotivation.pdf'; // Remplacez par le nom de fichier approprié
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error => {
          console.error('Erreur lors du téléchargement du CV', error);
        }
      );
    }
      

    afficheCandidat() {
      this.ConService.AfficheCondidat(this.id).subscribe(
        data => {
          console.log('Data from API:', data);
    
          if (data && data.length > 0) {
            this.dataSource.data = data;
           
          } else {
            console.log('No data available.');
          }
        },
        error => {
          console.log('Error from API:', error);
        }
      );
    }
    

    validerCandidat(id:number){
      this.ConService.ValiderStageEn(id).subscribe(
      data => {
        console.log("add data from API",data);
      },
      error =>{
        console.log('Error from API:',error);
      }
      );
    }

    refuserCandidat(id:number){
        this.ConService.RefuserStage(id).subscribe(
        data => {
          console.log("add data from API",data);
        },
        error =>{
          console.log('Error from API:',error);
        }
        );
    }
    
    

}


