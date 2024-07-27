// about.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Componenets/home/auth.service';

@Component({
  selector: 'app-about',
  template: `
    <div class="header">
      <div class="header-content">
        <div class="header-top">
          <p class="para">ADMIN</p>
          <button class="btn"  (click)="Deconnexion()">Deconnexion</button>
        </div>
      </div>
      <div class="header-divider"></div>
    </div>
    <div class="dashboard-container">
      <div class="sidebar">
        <div class="div1">
          <button class="sidebar-button" (click)="toggleListModal()">
            <mat-icon>view_list</mat-icon> Afficher
          </button>
          <app-list-modal *ngIf="showListModal"></app-list-modal>
          <button class="sidebar-button" (click)="toggleListModal2()">
            <mat-icon>add</mat-icon> Ajouter
          </button>
          <app-list-creer *ngIf="showListModal2"></app-list-creer>
          <button class="sidebar-button" (click)="goTo('Email')">
            <mat-icon>email</mat-icon> Boite Email
          </button>
        </div>
      </div>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    .dashboard-container {
      display: flex;
      height: 100%;
    }

    .btn {
      margin-left: 35cm;
      padding: 10px 20px;
      background-color: #B0B0B0;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: large;
      font-weight: bold;
      transition: background-color 0.3s;
    }

    .header-divider {
      height: 0.09cm;
      background-color: white;
    }

    .header-top {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
    }

    .sidebar {
      background-color: #513787;
      padding: 20px;
      min-width: 200px;
    }

    ::ng-deep .mat-form-field-underline {
      display: none;
    }

    ::ng-deep .mat-form-field-ripple {
      display: none;
    }

    .sidebar-button {
      display: block;
      width: 100%;
      padding: 16px;
      padding-left: 19px;
      margin-left: 0px;
      margin-bottom: 21px;
      background-color: #3E276A;
      color: #fff;
      border: none;
      text-decoration: none;
      cursor: pointer;
      font-weight: bold;
      font-size: x-large;
      transition: background-color 0.3s, width 0.3s;
    }

    .sidebar-button:hover {
      background-color: #B0B0B0;
    }

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #fff;
    }

    .div1 {
      margin-top: 1.5cm;
    }

    .header {
      background-color: #513787;
      padding: 0.009cm;
      color: #fff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .para {
      margin-top: 0.9cm;
      font-size: x-large;
      margin-left: 1.5cm;
      font-weight: bolder;
    }

    .header-content {
      display: flex;

      align-items: center;
    }
  `
})
export class AdminComponent {
  showListModal = false;
  showListModal2 = false;

    constructor(private router: Router , private authser:AuthService) {
        // Set the default route to "acceuil" when the component is initialized
        this.router.navigate(['/admin', 'message']);
    }

  toggleListModal() {
    this.showListModal = !this.showListModal;
  }

  toggleListModal2() {
    this.showListModal2 = !this.showListModal2;
  }

  goTo(route: string) {
    this.router.navigate(['/admin', route]);
  }
  Deconnexion(){
    this.authser.logout();
    this.router.navigate(['/login']);
  }
}
