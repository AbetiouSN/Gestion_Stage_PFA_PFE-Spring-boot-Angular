import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./Componenets/home/home.component";

import { AppCreateComponent } from "./creer-compte.component";
import { ListComponent } from "./list.component";

import { EmailComponent } from "./email.component";
import { AdminComponent } from "./admin.component";
import { List2Component } from "./list2.component";
import { List3Component } from "./list3.component";
import { List4Component } from "./list4.component";
import { AppCreate2Component } from "./creer2.component";
import { AppCreate3Component } from "./creer3.component";
import { AppCreate4Component } from "./creer4.component";
import { UpdateComponent } from "./Update-etudiant.component";
import { Update2Component } from "./Update-encadrent.component";
import { UpdateEntrepriseComponent } from "./Update-entreprise.component";
import { UpdateChefComponent } from './update-chef.component';
import { EntrepriseComponent } from "./entreprise.component";
import { MyOffresComponent } from "./MyOffres.component";
import { ApprouverComponent } from "./approuver.component";
import { ListeStageComponent } from "./listeStage.component";
import { AjoutPosteComponent } from "./AjoutPoste.component";
import { DesciptionComponent } from './description.component';

import { AdminGuard } from './guards/adminguard.guard';
import { EntrepriseGuard } from './guards/entrepriseguard.guard';

import { UpdatePostComponent } from './update-poste.component';

import { AccueilComponent } from './accueil.component';
import { VousComponent } from './vous.component';
import { EtudiantGuard } from './guards/etudiantguard.guard';






import { MesStagesComponent } from "./MesStages.component";
import { EtudiantComponent } from "./etudiant.compnent";
import { NotificationComponent } from "./notification.component";
import { PostulerComponent } from "./postuler.component";
import { MessageAdminComponent } from "./messageAdmin.component";
import { DeconnexionAdminComponent } from "./deconnexionAdmin.component";
import { DeconnexionComponent } from "./deconnexion.component";
import { UpdateEtuComponent } from "./update.component";
import { ChatComponent } from './chat.component';
import { StagesComponent } from './MyStagesV.component';
import { UpdatePComponent } from './updateP.component';

const routes: Routes = [
  { path: 'login', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: 'Creer', component: AppCreateComponent },
      { path: 'Creer2', component: AppCreate2Component },
      { path: 'Creer3', component: AppCreate3Component },
      { path: 'Creer4', component: AppCreate4Component },
      { path: 'List', component: ListComponent },
      { path: 'List2', component: List2Component },
      { path: 'List3', component: List3Component },
      { path: 'List4', component: List4Component },
      { path: 'Email', component: EmailComponent },
      { path: 'update-etudiant/:id', component: UpdateComponent },
      { path: 'update-encadrant/:id', component: Update2Component },
      { path: 'update-entreprise/:id', component: UpdateEntrepriseComponent },
      { path: 'update-chef/:id', component: UpdateChefComponent },
    ]
  },
  {
    path: 'entreprise', component: EntrepriseComponent,canActivate: [EntrepriseGuard], children: [
      { path: 'offres', component: MyOffresComponent },
      { path: 'description/:id', component: DesciptionComponent },
      { path: 'approuver/:id', component: ApprouverComponent },
      { path: 'listeStage', component: ListeStageComponent },
      { path: 'ajoutPoste', component: AjoutPosteComponent },
      { path: 'modifier/:id', component: UpdatePostComponent },
      { path: 'ProfilEn', component: UpdatePComponent },
     
    ]
  },


  {
    path: 'Etudiant', component: EtudiantComponent, canActivate: [EtudiantGuard], children: [
      { path: 'acceuil', component: AccueilComponent },
      { path: 'vous', component: VousComponent },
      { path: 'notification', component: MesStagesComponent },
      { path: 'mesStage', component: StagesComponent },
      {path:'postuler/:id',component:PostulerComponent },
      {path:'Chat',component:ChatComponent },

    ]
  },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
