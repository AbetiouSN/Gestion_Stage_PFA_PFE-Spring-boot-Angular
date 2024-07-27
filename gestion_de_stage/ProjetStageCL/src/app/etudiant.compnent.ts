import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './Componenets/home/auth.service';

@Component({
  selector: 'app-etu-comp',
  template: `
    <div class="header">
      <p class="para">Etudiant</p>
      <div class="header-bottom-bar"></div>
    </div>

    <div class="dashboard-container">
      <div class="sidebar">
        <div class="div1">
          <button class="sidebar-button" (click)="goTo('vous')">
            <mat-icon></mat-icon> Profile

          </button>
          <button class="sidebar-button" (click)="goTo('acceuil')">
            <mat-icon></mat-icon> Offre de stage

          </button>


          <button class="sidebar-button" (click)="goTo('notification')">
            <mat-icon></mat-icon>Nouveautés
          </button>

          <button class="sidebar-button" (click)="goTo('mesStage')">
            <mat-icon></mat-icon>Mes stages
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

    .sidebar {
      background-color:#513787;
      position: fixed;
      padding: 20px;
      min-width: 200px;
      position: fixed; /* Fixez la barre latérale */
  left: 0; /* Alignez la barre latérale sur la gauche */
  top: 0; /* Alignez la barre latérale en haut */
  bottom: 0;
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
  padding-left:17px;
  margin-left:0px;
 padding-right:1cm;
  margin-bottom: 21px;
  background-color: #3E276A;
  color: #fff;
  border: none;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
  transition: background-color 0.3s, width 0.3s;
}

.sidebar-button:hover {
  background-color:#B0B0B0;

}

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #fff;
      margin-left: 250px; /* Décalez le contenu principal de la largeur de la barre latérale */
  overflow-y: auto; 
    }

    .div1{
      margin-top: 1.5cm;
    }

    .header {
      background-color: #513787;
      padding: 5px;
      color: #fff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .para{
      margin-top: 0.8cm;
      font-size: x-large;
      margin-left: 1.5cm;
      font-weight: bolder;
    }


    .header-bottom-bar {
  height: 3px;
  background-color: #B0B0B0;
}


  `
,
})
export class EtudiantComponent {
  constructor(private router: Router , private authser:AuthService) {
    // Set the default route to "acceuil" when the component is initialized
    this.router.navigate(['/Etudiant', 'vous']);
  }

  goTo(route: string) {
    this.router.navigate(['/Etudiant', route]);
  }
  Deconnexion(){
    this.authser.logout();
    this.router.navigate(['/login']);
  }
}
