import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from "./schedule/schedule.component";
import {AddScheduleComponent} from "./schedule/add-schedule/add-schedule.component";

const routes: Routes = [
  {path:'',component:ScheduleComponent},
  {path:'new',component:AddScheduleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
