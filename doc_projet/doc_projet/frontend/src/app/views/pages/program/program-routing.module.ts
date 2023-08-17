import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProgramComponent} from "./program/program.component";
import {AddProgramComponent} from "./add-program/add-program.component";
import {EditProgramComponent} from "./edit-program/edit-program.component";

const routes: Routes = [
  {path:'',component:ProgramComponent},
  {path:'new',component:AddProgramComponent},
  {path: 'edit/:id', component: EditProgramComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
