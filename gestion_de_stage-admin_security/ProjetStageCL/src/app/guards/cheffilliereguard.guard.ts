import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Componenets/home/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CHEF_FILIEREeGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const currentUser = this.authService.currentUser();
    if (currentUser && currentUser.role === 'CHEF_FILIERE') {
      // L'utilisateur a le rôle de chef filliere, autorise l'accès
      return true;
    } else {
      // Redirige vers une page non autorisée ou gère l'accès d'une autre manière
      this.router.navigate(['/unauthorized']); // Exemple de redirection vers une page d'autorisation refusée
      return false;
    }
  }
}
