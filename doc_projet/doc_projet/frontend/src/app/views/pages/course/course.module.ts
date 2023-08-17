import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../../../@core/interceptors/jwt-token.interceptor.service";
import {ReactiveFormsModule} from "@angular/forms";
import { EditCourseComponent } from './edit-course/edit-course.component';


@NgModule({
  declarations: [
    CourseComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ]
})
export class CourseModule { }
