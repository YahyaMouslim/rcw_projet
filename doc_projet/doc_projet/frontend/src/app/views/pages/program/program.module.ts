import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program/program.component';
import {EditProgramComponent} from "./edit-program/edit-program.component";
import {AddProgramComponent} from "./add-program/add-program.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";


@NgModule({
  declarations: [
    ProgramComponent,
    EditProgramComponent,
    AddProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ]
})
export class ProgramModule { }
