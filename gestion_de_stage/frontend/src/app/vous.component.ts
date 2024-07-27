// vous-component.component.ts
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { etudiant } from './model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { AuthService } from './Componenets/home/auth.service';

@Component({
  selector: 'app-creer-compte',
  template: `
    <div class="profile-info">

      <div class="profile-petit">
        <i class="fas fa-user" style="color:#058E95; font-size: 5em; padding-left: 0px; margin-top:0px " ></i>
      </div>
      <div class="table">
      <table>
        <tr>
          <td>Nom:</td>
          <td>{{this.etudiant.nom}}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{{this.etudiant.user.email}}</td>
        </tr>
        <tr>
          <td>date de naissance</td>
          <td>{{this.etudiant.dateNais}}</td>
        </tr>
        <tr>
          <td>Filière:</td>
          <td>{{etudiant.filiere}}</td>
        </tr>
        <tr>
          <td><button (click)="Deconnexion()">Déconnexion </button>    </td>
        </tr>
        
      </table>
    </div>
    </div>
  `,
  styles: `
    /* Ajoutez vos styles ici */

    .profile-info {
      position: relative;
      padding-bottom: 7cm;
      text-align: left; /* Aligne le texte à gauche */
      border: 1px solid #ddd; /* Solid border */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Shadow effect */
    }
.table{
padding-top:2cm;
padding-left:2cm;
}
    .background-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .profile-petit {
      background-color: #C8F2F4;
      padding-top: 2cm;
    }

    .profile-petit i {
      font-size: 5em; /* Ajustez la taille de l'icône selon vos besoins */
      margin-top: 0.5em; /* Ajuste la marge supérieure de l'icône */
    }

    .profile-info table {
      text-align: left;
      margin-top: 20px; /* Marge supérieure pour la table */
    }

    .profile-info button {
      padding: 10px;
      background-color: #3498db;
      color: white;
      border: none;
      cursor: pointer;
    }
  `,
})
export class VousComponent {
  etudiant:etudiant=new etudiant();
  
  constructor(private router: Router, private etuser:EtudiantService, private authser:AuthService) {}
  ngOnInit(): void {
    this.afficher();
   
  }
  afficher(){
    const currentUser = this.authser.currentUser();
    
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.etuser.getInfoetudiant(userEmail)
      .subscribe((response) => {
        
        console.log(response);
        this.etudiant=response;
      
  })}}

  goTo(route: string) {
    this.router.navigate(['/Etudiant', route]);
  }
  Deconnexion(){
    this.authser.logout();
    this.router.navigate(['/login']);
  }
}
