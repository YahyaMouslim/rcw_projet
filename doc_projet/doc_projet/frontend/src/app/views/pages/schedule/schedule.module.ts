import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import {ScheduleComponent} from "./schedule/schedule.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddScheduleComponent } from './schedule/add-schedule/add-schedule.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    AddScheduleComponent
  ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        NgxDatatableModule,
        NgbDropdownModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDatepickerModule
    ]
})
export class ScheduleModule { }
