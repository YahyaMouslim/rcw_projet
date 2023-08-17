import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomComponent } from './classroom/classroom.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ClassroomComponent,
    AddClassroomComponent,
    EditClassroomComponent
  ],
    imports: [
        CommonModule,
        ClassroomRoutingModule,
        NgxDatatableModule,
        ReactiveFormsModule
    ]
})
export class ClassroomModule { }
