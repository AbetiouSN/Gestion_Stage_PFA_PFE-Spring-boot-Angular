import { Component } from '@angular/core';;
import { OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { EntrepriseService } from './entreprise.service';
import { post } from './model/post.model';
import { PostService } from './poste.service';

@Component({
  selector: 'app-creer-compte',
  template: `
    <div *ngIf="post">
   
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ post.designation }}</mat-card-title>
          <mat-card-subtitle>{{ post.filiere }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Type de stage:</strong> {{ post.skile1 }}</p>
          <p><strong>Type de stage:</strong> {{ post.skile2 }}</p>
          <p><strong>Type de stage:</strong> {{ post.skile3 }}</p>
          <p><strong>Type de stage:</strong> {{ post.typeStage }}</p>
          <p><strong>Date de début:</strong> {{ post.date_debut }}</p>
          <p><strong>Date de fin:</strong> {{ post.date_fin }}</p>
          <p><strong>Mission:</strong> {{ post.mission }}</p>
        
        </mat-card-content>
      </mat-card>
      <div>
      <button (click)="goAff(post.id)" style="margin-right: 10px; padding: 8px 16px; background-color:  #513787; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Voir les candidatures
    </button>
</div>
<div>
    <button (click)="goTo('modifier')" style="padding: 8px 16px; background-color: #513787; margin-top:0.5cm ; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Mise à jour de poste
    </button>
    </div>
    </div>
   
  `,
  styles: `
   mat-card {
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

mat-card-header {
 
  color: white;
}

mat-card-content {
  padding: 15px;
}




  `,
})

export class DesciptionComponent implements OnInit{
post:post=new post();
id:number=0;
saveSuccess:boolean=false;
  constructor(private postService:PostService ,private router:Router, private route: ActivatedRoute,){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(data =>{
      this.post=data;
      this.saveSuccess=true;
      console.log(data);
    }, error => console.log(error));

  }

  goTo(route: string) {
    this.router.navigate(['/entreprise', route,this.post.id]);
  }

  goAff(id:number) {
    this.router.navigate(['/entreprise/approuver' ,id]);
  }
}