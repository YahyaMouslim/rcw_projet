import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassroomComponent} from "./classroom/classroom.component";
import {AddClassroomComponent} from "./add-classroom/add-classroom.component";
import {EditClassroomComponent} from "./edit-classroom/edit-classroom.component";

const routes: Routes = [
  {path:'',component:ClassroomComponent},
  {path:'new',component:AddClassroomComponent},
  {path: 'edit/:id', component: EditClassroomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
