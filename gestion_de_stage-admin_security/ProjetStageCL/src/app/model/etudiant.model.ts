import { user } from "./user.model";

export class etudiant {
    id: number = 0;
    nom: string = '';
    prenom: string = '';
    tele: string = '';
    dateNais: string = '';
    filiere : string ='';
    niveau: string = '';
    user: user = new user();
  }
