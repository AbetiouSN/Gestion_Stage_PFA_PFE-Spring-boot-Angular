import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-email',
  template: `

    <mat-tab-group class="EFG" [(selectedIndex)]="selectedTabIndex">
      <!-- Créer un nouveau email -->
      <mat-tab label="Créer un email">
        <div class="abc" *ngIf="selectedTabIndex === 0">
          <form [formGroup]="createForm">
            <!-- Adresse email -->
            <mat-form-field class="center-input">
              <input matInput formControlName="to" placeholder="Adresse e-mail du destinataire" [(ngModel)]="email.to">
            </mat-form-field>
            <!-- Contenu -->
            <mat-form-field class="center-input">
              <textarea matInput formControlName="content" placeholder="Contenu de l'e-mail" [(ngModel)]="email.content"></textarea>
            </mat-form-field>
            <!-- Bouton -->
            <button mat-raised-button color="primary" type="submit" (click)="sendEmail()">Envoyer</button>
          </form>
        </div>
      </mat-tab>

<!--Afficher les emails envoyées-->


      <mat-tab   label="Emails envoyés">
        <div   class="A" *ngIf="selectedTabIndex === 1">

          <mat-table [dataSource]="sentEmails">
            <ng-container matColumnDef="toSent">
              <mat-header-cell *matHeaderCellDef>Destinataire</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.to }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="contentSent">
              <mat-header-cell *matHeaderCellDef>Contenu</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.content }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="timestampSent">
              <mat-header-cell *matHeaderCellDef>Heure</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.timestamp | date: 'shortTime' }}</mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="['toSent', 'contentSent', 'timestampSent']"></mat-header-row>
            <mat-row *matRowDef="let row; columns: ['toSent', 'contentSent', 'timestampSent'];"></mat-row>
          </mat-table>
        </div>
      </mat-tab>





<!--      liste des emails reçu-->

      <mat-tab  label="Emails reçus">
        <div  class="EFG"  *ngIf="selectedTabIndex === 2">
          <mat-table [dataSource]="receivedEmails">
            <ng-container matColumnDef="fromReceived">

              <mat-header-cell *matHeaderCellDef>Expéditeur</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.from }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="contentReceived">
              <mat-header-cell *matHeaderCellDef>Contenu</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.content }}</mat-cell>
            </ng-container>

            <ng-container matColumnDef="timestampReceived">
              <mat-header-cell *matHeaderCellDef>Heure</mat-header-cell>
              <mat-cell *matCellDef="let email">{{ email.timestamp | date: 'shortTime' }}</mat-cell>
            </ng-container>

            <mat-header-row *matHeaderRowDef="['fromReceived', 'contentReceived', 'timestampReceived']"></mat-header-row>
            <mat-row *matRowDef="let row; columns: ['fromReceived', 'contentReceived', 'timestampReceived'];"></mat-row>
          </mat-table>





        </div>
      </mat-tab>















    </mat-tab-group>
  `,
  styles: [
    `
      .abc {
        margin-left: 5cm;
        margin-right: 3cm;
      }

      .EFG {
        margin-left: 5cm;
        margin-right: 3cm;
      }

      mat-tab {
        padding: 20px;
        margin-left: 5cm;
        margin-right: 3cm;
      }

      mat-table {
        width: 50%;
        margin-top: 20px;
      }

      .center-input {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
})



export class EmailComponent {
  selectedTabIndex: number = 0;
  createForm: FormGroup;


  sentEmails = [
    { to: 'Oracle@example.com', content: 'dans le cadre de notre nouveau partenariat ........', timestamp: new Date() },
 //email apporté par api
  ];


  receivedEmails = [
    { from: 'adminA@example.com', content: 'hola email bien recu', timestamp: new Date() },
// //email apporté par api
  ];



  constructor() {
    this.createForm = new FormGroup({
      to: new FormControl(''),
      content: new FormControl(''),
    });
  }

  switchTab(tab: 'create' | 'sent' | 'received') {
    if (tab === 'create') {
      this.selectedTabIndex = 0;
    } else if (tab === 'sent') {
      this.selectedTabIndex = 1;
    } else if (tab === 'received') {
      this.selectedTabIndex = 2;
    }
  }

  // Instance de l'objet email
  email: { to: string, content: string } = { to: '', content: '' };


  sendEmail() {
    console.log('Email Object:', this.email);
    this.createForm.reset();
  }
}
