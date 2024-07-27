import { Component } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-list-creer',


  template: `
    <div><button (click)="goTo('Creer')"  ><mat-icon>people</mat-icon> Etudiant</button></div>
    <div><button (click)="goTo('Creer2')"><mat-icon>supervisor_account</mat-icon> Encadrant</button></div>
    <div><button (click)="goTo('Creer3')"><mat-icon>business_center</mat-icon> Chef Filliere</button></div>
    <div><button (click)="goTo('Creer4')"><mat-icon>business</mat-icon> Entreprise</button></div>

  `,
  styles: `
  /* CSS pour les boutons */
button {
  width: 150px; /* Ajustez la largeur selon vos besoins */
  padding: 10px;
  margin: 5px;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, box-shadow 0.3s;
  background-color: #3E276A;
  font-weight: bold;
  font-size: large;
  color: #f5f1f2;
}

/* Effet d'ombre au survol */
button:hover {
  background-color: #85b8ef; /* Couleur bleue au survol, ajustez selon vos besoins */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Ombre au survol */
  color: #ffffff; /* Couleur du texte au survol, ajustez selon vos besoins */
}


  `
})
export class ListCreerComponent {
  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate(['/admin', route]);
  }



}
