import { user } from "./user.model";

export class Entreprise {
  id: number=0;
  nom: string='';
  address: string='';
  emailRH: string='';
  lienSite: string='';
  description: string='';
  user : user=new user();

}
