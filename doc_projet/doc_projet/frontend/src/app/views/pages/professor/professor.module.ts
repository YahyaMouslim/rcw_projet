import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorRoutingModule } from './professor-routing.module';
import { ProfessorComponent } from './professor/professor.component';
import { AddProfessorComponent } from './professor/add-professor/add-professor.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EtudiantComponent } from './etudiant/etudiant.component';
import { RapportComponent } from './rapport/rapport.component';
import {FeahterIconModule} from "../../../@core/feather-icon/feather-icon.module";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {DirecteurComponent} from "./directeur/directeur.component";
import {AddDirecteurComponent} from "./directeur/add-professor/add-directeur.component";


@NgModule({
  declarations: [
    ProfessorComponent,
    AddProfessorComponent,
    EtudiantComponent,
    RapportComponent,
    DirecteurComponent,AddDirecteurComponent
  ],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    FeahterIconModule,
    NgbDatepickerModule
  ]
})
export class ProfessorModule { }
