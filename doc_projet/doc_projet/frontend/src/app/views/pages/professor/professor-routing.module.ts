import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProgramComponent} from "../program/program/program.component";
import {AddProgramComponent} from "../program/add-program/add-program.component";
import {ProfessorComponent} from "./professor/professor.component";
import {AddProfessorComponent} from "./professor/add-professor/add-professor.component";
import {EtudiantComponent} from "./etudiant/etudiant.component";
import {RapportComponent} from "./rapport/rapport.component";
import {DirecteurComponent} from "./directeur/directeur.component";
import {AddDirecteurComponent} from "./directeur/add-professor/add-directeur.component";

const routes: Routes = [
  {path:'',component:ProfessorComponent},
  {path:'etud',component:EtudiantComponent},
  {path:'dir',component:DirecteurComponent},
  {path:'new',component:AddProfessorComponent},
  {path:'newdir',component:AddDirecteurComponent},
  {path:'rapport',component:RapportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
