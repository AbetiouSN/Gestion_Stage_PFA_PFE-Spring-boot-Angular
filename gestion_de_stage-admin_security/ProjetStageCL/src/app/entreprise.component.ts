// about.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Componenets/home/auth.service';
@Component({
  selector: 'entr-comp',
  template: `
    <div class="header">
      <p class="para">Entreprise</p>
      <button class="btn"  (click)="Deconnexion()">Deconnexion</button>
      <div class="header-bottom-bar"></div>
    </div>

    <div class="dashboard-container">
      <div class="sidebar">
        <div class="div1">
          <button class="sidebar-button" (click)="goTo('offres')">
            <mat-icon></mat-icon> Mes Offres

          </button>


          <button class="sidebar-button" (click)="goTo('listeStage')">
            <mat-icon></mat-icon>  Liste des stages
          </button>

          <button class="sidebar-button" (click)="goTo('ProfilEn')">
            <mat-icon></mat-icon>   Mise a jour profil
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

.sidebar-button:hover {
  background-color:#B0B0B0;

}

    .main-content {
      flex: 1;
      padding: 20px;
      background-color: #fff;
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
})
export class EntrepriseComponent {

  constructor(private router: Router , private authser:AuthService) {}


  goTo(route: string) {
    this.router.navigate(['/entreprise', route]);
  }
  Deconnexion(){
    this.authser.logout();
    this.router.navigate(['/login']);
  }

}
