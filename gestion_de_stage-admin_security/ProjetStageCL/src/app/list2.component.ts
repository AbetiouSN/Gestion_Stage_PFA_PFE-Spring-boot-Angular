// list2.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { encadrant } from "./model/encadrant.model";
import { EncadrantService } from "./encadrant.service";

@Component({
  selector: 'app-list2',
  template: `
    <div class="mat-elevation-z8 tab">
      <mat-form-field>
        <input matInput #emailInput placeholder="Filter by Email" (input)="applyFilter(emailInput.value)">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-table">




        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Nom</span></th>
          <td mat-cell *matCellDef="let element">{{element.nom}}</td>
        </ng-container>


        <ng-container matColumnDef="prenom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Prenom</span></th>
          <td mat-cell *matCellDef="let element">{{element.prenom}}</td>
        </ng-container>


        <ng-container matColumnDef="numero-telephone">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Numero  du Telephone</span></th>
          <td mat-cell *matCellDef="let element">{{element.tele}}</td>
        </ng-container>

        <ng-container matColumnDef="departement">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Departement</span></th>
          <td mat-cell *matCellDef="let element">{{element.departement}}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Email</span></th>
          <td mat-cell *matCellDef="let element">{{element.user.email}}</td>
        </ng-container>







        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Actions</span></th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="goToUpdate(element.id)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn"  (click)=" goToDelete(element.id)">
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
export class List2Component implements OnInit {
  displayedColumns: string[] = [ 'nom', 'prenom', 'numero-telephone','departement', 'email', 'actions'];
  dataSource = new MatTableDataSource<encadrant>([]);

  constructor(private encadrantService: EncadrantService, private router: Router) {}

  ngOnInit(): void {
    this.loadEncadrant();
  }

  loadEncadrant() {
    this.encadrantService.getEncadrant().subscribe(
        data => {
          console.log(data);
          this.dataSource.data = data;
        },
        error => {
          console.log(error);
        }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['admin', 'update-encadrant', id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  goToDelete(id: number): void {
    this.encadrantService.deleteEncadrant(id).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error(error);

      }
    );
  }
}
