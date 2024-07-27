import { Component } from '@angular/core';
import { etudiant } from './model/etudiant.model';
import { PostService } from './poste.service';
import { AuthService } from './Componenets/home/auth.service';
import { EtudiantService } from './etudiant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-creer-compte',
  template: `
    <div class="file-container">
      <p>Bonjour! Veuillez joindre votre CV et lettre de motivation ici.</p>

      <label for="cvFile">CV File:</label>
      <input type="file" id="cvFile" (change)="onFile2Selected($event)" accept=".pdf, .doc, .docx">

      <label for="motivationFile">Cover Letter File:</label>
      <input type="file" id="motivationFile" (change)="onFile1Selected( $event)" accept=".pdf, .doc, .docx">

     

      <button mat-button color="primary" (click)=" onSubmit()">OK</button>
    </div>
  `,
  styles: `
    .file-container {
      padding: 20px;
      border: 1px solid #ddd;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
  `,
})
export class PostulerComponent {
   cvFile: File | undefined ;
   motivationFile: File | undefined
 /* selectedFiles: File[] = [];
  fileType: string = 'Externe';*/
  

  id:number=0;
 

  etudiant:etudiant = new etudiant();
  constructor(private postSer:PostService ,private authser :AuthService , private etuser:EtudiantService ,private router: Router,private route: ActivatedRoute) {}
  onFile1Selected( event: any) {
    this.cvFile=event.target.files[0];
    /*const selectedFiles: FileList = event.target.files;
    
    const cvFile: File | undefined = selectedFiles[0];
    const motivationFile: File | undefined = selectedFiles[2];

      this.selectedFiles.push(cvFile);
      this.selectedFiles.push(motivationFile);
    
    console.log(this.selectedFiles);*/
    
   
    
  
  }
  onFile2Selected( event: any) {
    this.motivationFile=event.target.files[0];}

  onSubmit() {
   /* const formData = new FormData();
    formData.append('cvFile', this.selectedFiles[0].name);
    formData.append('motivationFile', this.selectedFiles[2].name);
    formData.append('etudiantId', this.etudiant.id.toString());
    formData.append('postId', this.id.toString());
  
    formData.forEach((value, key) => {
      console.log(key, value);
      
    });
  
    this.postSer.postuller(formData)
      .pipe(
        catchError(error => {
          console.error('Postuler Error:', error);
          // Handle the error here, such as displaying an error message to the user
          return []; // Return an empty observable to prevent the method from throwing an error
        })
      )
      .subscribe(
        (response) => {
          console.log('Postuler Response:', response);
          // Logique supplémentaire après avoir soumis les fichiers
        }
      );*/
      if(this.cvFile && this.motivationFile)
      this.postSer.postuller(this.cvFile,this.motivationFile,this.etudiant.id,this.id)
     //hadi kattla3 erreur walakin khadama 
     
      .subscribe(
        (response) => {
          console.log('Postuler Response:', response);
         
          // Logique supplémentaire après avoir soumis les fichiers
        }
      );
      this.router.navigate(['/Etudiant/acceuil']);

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const currentUser = this.authser.currentUser();
    
    const userEmail = currentUser?.email;
    console.log(userEmail)
    
    if (currentUser && userEmail) {
      this.etuser.getInfoetudiant(userEmail)
      .subscribe((response) => {
        
        console.log(response);
      
       this.etudiant.id = response.id;
       this.etudiant.filiere=response.filiere;

       
        
        // Remplissage des détails de l'utilisateur de l'entreprise
        this.etudiant.user.email = response.user.email;
        this.etudiant.user.role = response.user.role;
       
      
          
        });
    } else {
     
      console.error("L'e-mail de l'utilisateur est indéfini.");
    }
    
   
  }
 
 
}
