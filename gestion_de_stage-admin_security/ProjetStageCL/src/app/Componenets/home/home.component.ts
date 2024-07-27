import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { user } from '../../model/user.model';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

  user: user = { email: '', password: '', role: '' };
  message: string = '';
  authenticatedUser!: user | null;
  constructor(

    private authService: AuthService,


    private router: Router,

  ) { }

  ngOnInit(): void {

    this.authenticatedUser = this.authService.currentUser();
  }
  signin() {

    const credentials = { email: this.user.email, password: this.user.password };
    this.authService.login(credentials).subscribe({
      next: (response) => {

        this.authenticatedUser = this.authService.currentUser();

        const role = this.authService.currentUser()?.role;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
        if (role === 'ENTREPRISE') {
          this.router.navigate(['/entreprise']);
        }
        if (role === 'CHEF_FILIERE') {
          this.router.navigate(['/cheffillire']);
        }
        if (role === 'ETUDIANT') {
          this.router.navigate(['/Etudiant']);
        }
        if (role === 'ENCADRANT') {
          this.router.navigate(['/encadrant']);
        }
      },
      error: (err: any) => {
        this.message = 'IdUser ou mot de passe incorrect';

      },
    });
  }

}
