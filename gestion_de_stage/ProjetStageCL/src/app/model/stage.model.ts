import { encadrant } from "./encadrant.model";
import { Entreprise } from "./entreprise.model";
import { etudiant } from "./etudiant.model";
export class stage {
  id:number=0;
  sujet:string='';
  filiere:string="";
  niveau:string='';
  date_debut:string="";
  date_fin:string="";
  validEntrep:boolean=false;
  validEtud:boolean=false;
  validChef:boolean=false;
  cloture:boolean=false;
  etud_id: etudiant['id'] = 0;
  entrep:Entreprise = new Entreprise();
  encadr:encadrant=new encadrant();

}