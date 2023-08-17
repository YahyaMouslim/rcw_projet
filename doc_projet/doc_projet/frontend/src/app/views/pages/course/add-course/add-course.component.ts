import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Course} from "../../../../@core/models/course.model";
import {CourseService} from "../../../../@services/course.service";
import {SweetAlertService} from "../../../../@core/shared/sweet-alert.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;
  submited : boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService : SweetAlertService,
              private courseService : CourseService,
  ) { }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      credits: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  getRowClass(row: any, rowIndex: number): string {
    return rowIndex % 2 === 0 ? 'datatable-odd-row' : '';
  }

  submit() {
    this.submited=true;
    if(this.courseForm.valid){
      const course: Course = this.courseForm.value;
      this.courseService.post(course).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Cours ajouté avec succès");
          this.router.navigate(['/course']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
        }
      })
    }
  }
}
