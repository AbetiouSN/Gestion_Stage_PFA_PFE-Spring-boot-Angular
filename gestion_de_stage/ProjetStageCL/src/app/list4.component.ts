import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from './entreprise.service';
import {Entreprise} from "./model/entreprise.model";

@Component({
  selector: 'app-list4',
  template: `
    <div class="mat-elevation-z8 tab">
      <mat-form-field >
        <input matInput #emailInput placeholder="Filter by Email" (input)="applyFilter(emailInput.value)">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-table">

        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue"> Nom</span></th>
          <td mat-cell *matCellDef="let element">{{element.nom}}</td>
        </ng-container>


        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Adresse</span></th>
          <td mat-cell *matCellDef="let element">{{element.address}}</td>
        </ng-container>


        <ng-container matColumnDef="emailRH">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Email du RH </span></th>
          <td mat-cell *matCellDef="let element">{{element.emailRH}}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Email</span></th>
          <td mat-cell *matCellDef="let element">{{element.user.email}}</td>
        </ng-container>
        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Actions</span></th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="goToUpdate(element.id)">
              <mat-icon>modefier</mat-icon>
            </button>
            <button mat-icon-button color="warn"   (click)="goToDelete(element.id)">
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
export class List4Component implements OnInit{
  displayedColumns: string[] = [ 'nom', 'address', 'emailRH' ,'email','actions'];
  dataSource = new MatTableDataSource<Entreprise>([]);

  constructor(private entrepriseService:EntrepriseService, private router: Router) {}

  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises() {
    this.entrepriseService.getEntreprises().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToUpdate(id:number){
    this.router.navigate(['admin/update-entreprise',id]);
  }



  goToDelete(id: number){
    this.entrepriseService.deleteEntreprise(id).subscribe( data => {
      console.log(data);
      this.loadEntreprises();
    })
  }
}
