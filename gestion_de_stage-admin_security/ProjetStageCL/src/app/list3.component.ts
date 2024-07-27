// list.component.ts

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { chef } from './model/chef.model';
import { chefService } from './chef.service';

@Component({
  selector: 'app-list3',
  template: `
    <div class="mat-elevation-z8 tab">
      <mat-form-field>
        <input matInput #emailInput placeholder="Filter by Email" (input)="applyFilter(emailInput.value)">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-table">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Id chef filliere</span></th>
          <td mat-cell *matCellDef="let element">{{element.id}}</td>
        </ng-container>

        <!-- Nom Column -->
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Nom</span></th>
          <td mat-cell *matCellDef="let element">{{element.nom}}</td>
        </ng-container>

        <!-- Prénom Column -->
        <ng-container matColumnDef="prenom">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Prénom</span></th>
          <td mat-cell *matCellDef="let element">{{element.prenom}}</td>
        </ng-container>

        <!-- Filière Column -->
        <ng-container matColumnDef="filliere">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Filière</span></th>
          <td mat-cell *matCellDef="let element">{{element.filiere}}</td>
        </ng-container>

        <!-- Téléphone Column -->
        <ng-container matColumnDef="tele">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Téléphone</span></th>
          <td mat-cell *matCellDef="let element">{{element.tele}}</td>
        </ng-container>

        <!-- Email Column (from User) -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Email</span></th>
          <td mat-cell *matCellDef="let element">{{element.user.email}}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef><span class="bold-blue">Actions</span></th>
          <td mat-cell *matCellDef="let element">
            <button mat-icon-button color="primary" (click)="goToUpdate(element.id)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteChef(element.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <!-- Binding des colonnes -->
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
export class List3Component implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'filliere', 'tele', 'email', 'actions'];
  dataSource = new MatTableDataSource<chef>([]);

  constructor(private router: Router, private route: ActivatedRoute, private chefService: chefService) { }

  ngOnInit(): void {
    this.Afficherchefs();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goTo(route: string) {
    this.router.navigate(['/admin', route]);
  }

  


  deleteChef(userId: string) {
    const id = Number(userId);
  
    this.chefService.deleteChef(id).subscribe(
      (response: any) => {
        this.Afficherchefs();
        console.log(response);
        // Update your list of chefs after deletion if necessary
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  goToUpdate(id:number){
    this.router.navigate(['admin','update-chef',id]);
  }
  
  Afficherchefs() {
    this.chefService.getInformationsClasses().subscribe(
      (data: chef[]) => {
        this.dataSource.data = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}