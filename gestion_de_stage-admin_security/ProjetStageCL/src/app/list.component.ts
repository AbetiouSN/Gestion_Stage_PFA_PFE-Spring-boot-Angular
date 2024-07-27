// list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import {etudiant} from "./model/etudiant.model";
import {user} from "./model/user.model";
import {EtudiantService} from "./etudiant.service";
@Component({
  selector: 'app-list',
  template: `
    <div class="mat-elevation-z8 tab">
      <mat-form-field>
        <input matInput #emailInput placeholder="Filter by Email" (input)="applyFilter(emailInput.value)">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-table">



        <!-- Nom Column -->
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Nom</span></th>
          <td mat-cell *matCellDef="let element">{{element.nom}}</td>
        </ng-container>

        <!-- Prenom Column -->
        <ng-container matColumnDef="prenom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Prenom</span></th>
          <td mat-cell *matCellDef="let element">{{element.prenom}}</td>
        </ng-container>



        <ng-container matColumnDef="numero du telephone">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Numero du telephone</span></th>
          <td mat-cell *matCellDef="let element">{{element.tele}}</td>
        </ng-container>

        <ng-container matColumnDef="date naissance">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">date de naissance</span></th>
          <td mat-cell *matCellDef="let element">{{element.dateNais}}</td>
        </ng-container>

        <ng-container matColumnDef="niveau">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Classe</span></th>
          <td mat-cell *matCellDef="let element">{{element.niveau}}</td>
        </ng-container>


        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Email</span></th>
          <td mat-cell *matCellDef="let element">{{element.user.email}}</td>
        </ng-container>


        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Actions</span></th>
          <td mat-cell *matCellDef="let element">


            <button mat-icon-button color="primary"  (click)="goToUpdate(element.id)">
              <mat-icon>edit</mat-icon>
            </button>


            <button mat-icon-button color="warn" (click)="goToDelete2(element.id)" >
              <mat-icon>delete</mat-icon>
            </button>
          </td>
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
export class ListComponent implements OnInit {
  displayedColumns: string[] = [ 'nom', 'prenom', 'numero du telephone','date naissance' ,'niveau','email', 'actions'];
  dataSource = new MatTableDataSource<etudiant>([]);

  constructor(private etudiantService: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    this.loadEtudiant();
  }

  loadEtudiant() {
    this.etudiantService.getEtudiants().subscribe(
        data => {
          this.dataSource.data = data;
        },
        error => {
          console.log(error);
        }
    );
  }


  goToUpdate(id: number) {
    this.router.navigate(['admin', 'update-etudiant', id]);
  }
  goToDelete(id:number){
    this.router.navigate(['admin', 'delete-etudiant', id]);
  }



  goToDelete2(id: number): void {
    this.etudiantService.deleteEtudiant(id).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error(error);

      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
