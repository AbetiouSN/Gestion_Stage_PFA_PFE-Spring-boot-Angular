// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from './app.routes'; // Assurez-vous que le nom du fichier est correct
import { MatCardModule } from '@angular/material/card';
import{MatDialogModule} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {ListModalComponent} from "./Componenets/list-modal/list-modal.component";
import {ListComponent} from "./list.component";
import{MatDatepickerModule} from "@angular/material/datepicker";
import{AppCreateComponent} from "./creer-compte.component";

import { MatTableModule } from '@angular/material/table';
import {EmailComponent} from "./email.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from "./Componenets/home/home.component";
import {AdminComponent} from "./admin.component";
import {List2Component} from "./list2.component";
import {List3Component} from "./list3.component";
import {List4Component} from "./list4.component";
import {AppCreate2Component} from "./creer2.component";
import {AppCreate3Component} from "./creer3.component";
import {AppCreate4Component} from "./creer4.component";
import {ListCreerComponent} from "./list-creer.component";
import { HttpClientModule } from '@angular/common/http';
import {UpdateComponent} from "./Update-etudiant.component";
import{ UpdateEntrepriseComponent} from "./Update-entreprise.component";

import {Update2Component} from "./Update-encadrent.component";
import {EntrepriseComponent} from "./entreprise.component";
import {MyOffresComponent} from "./MyOffres.component";
import {ApprouverComponent} from "./approuver.component";
import {ListeStageComponent} from "./listeStage.component";
import {AjoutPosteComponent} from "./AjoutPoste.component";
import{EtudiantService} from "./etudiant.service";
import { chefService } from './chef.service';

import { UpdateChefComponent } from './update-chef.component';
import {DesciptionComponent} from "./description.component";


import { UpdatePostComponent } from './update-poste.component';

import {AccueilComponent} from "./accueil.component";
import {VousComponent} from "./vous.component";

import {MesStagesComponent} from "./MesStages.component";
import {EtudiantComponent} from "./etudiant.compnent";
import {NotificationComponent} from "./notification.component";
import {PostulerComponent} from "./postuler.component";
import {MessageAdminComponent} from "./messageAdmin.component";
import {DeconnexionAdminComponent} from "./deconnexionAdmin.component";
import {DeconnexionComponent} from "./deconnexion.component";
import {UpdateEtuComponent} from "./update.component";
import { ChatComponent } from './chat.component';
import { StagesComponent } from './MyStagesV.component';
import { UpdatePComponent } from './updateP.component';

@NgModule({
    declarations: [
        AppComponent,
      AdminComponent,
ChatComponent,
        ListModalComponent,
    AppCreateComponent,
        ListComponent,
      EmailComponent,

      HomeComponent,
      List2Component,
      List3Component,
      List4Component,
   AppCreate2Component,
      AppCreate3Component,
      AppCreate4Component,
      ListCreerComponent,
      UpdateComponent,
        Update2Component,
      UpdateEntrepriseComponent,
      UpdateChefComponent,
      EntrepriseComponent,
      MyOffresComponent,
      ApprouverComponent,
      ListeStageComponent,
      AjoutPosteComponent,

      DesciptionComponent,

      DesciptionComponent,
      UpdatePostComponent,

      AccueilComponent,
      VousComponent,

      MesStagesComponent,
      EtudiantComponent,
      NotificationComponent,
      PostulerComponent,
        MessageAdminComponent,
        DeconnexionAdminComponent,
      DeconnexionComponent,
      UpdateEtuComponent,
      StagesComponent,
      UpdatePComponent


    ],
    imports: [
        MatCardModule,
        BrowserModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        RouterModule,
        MatIconModule,
        AppRoutingModule,
        MatSelectModule,// Ajoutez le module de routage ici
        MatDialogModule,
        MatDatepickerModule,
        MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      ReactiveFormsModule,
        HttpClientModule,
        FormsModule,


    ],
    providers: [],


    bootstrap: [AppComponent]
})
export class AppModule { }
