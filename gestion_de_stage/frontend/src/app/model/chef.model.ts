// chef.model.ts
import { user } from "./user.model";

export class chef {
  id: number = 0;
  nom: string = '';
  prenom: string = '';
  tele: string = '';
  filiere: string = '';

  user: user = new user();
}
