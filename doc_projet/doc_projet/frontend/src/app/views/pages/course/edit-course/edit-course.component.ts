import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  courseForm: FormGroup;
  submited : boolean = false;
  courseId: number;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private courseService : CourseService,
  ) { }
  ngOnInit(): void {

    this.courseForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      credits: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.params.subscribe((params:any) => {
      console.log(params)
      this.courseId = params['id']; // Convert to a number
      console.log('Received ID:', this.courseId);

      this.courseService.getById(this.courseId).subscribe({
        next:course =>{
          this.courseForm.patchValue(course);
        },
        error: err=>{}
      })
    });


  }

  submit() {
    this.submited=true;
    if(this.courseForm.valid){
      let course: Course = this.courseForm.value;
      course = {...course,_id:this.courseId}
      this.courseService.update(this.courseId,course).subscribe({
        next:(data:any)=>{
          this.router.navigate(['/course'])
        },
        error: err => {

        }
      })
    }
  }

}
