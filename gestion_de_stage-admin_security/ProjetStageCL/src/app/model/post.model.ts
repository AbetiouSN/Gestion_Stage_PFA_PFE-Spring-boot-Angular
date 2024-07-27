import { Entreprise } from "./entreprise.model";
export class post {
  id:number=0;
  designation: string ='';
  skile1: string='';
  skile2: string='';
  skile3: string='';
  filiere: string='';
  typeStage: string='';
  date_debut: string='';
  date_fin: string='';
  mission: string='';
  cloture: boolean=false;
  idEntreprise:Entreprise=new Entreprise();
 

}
