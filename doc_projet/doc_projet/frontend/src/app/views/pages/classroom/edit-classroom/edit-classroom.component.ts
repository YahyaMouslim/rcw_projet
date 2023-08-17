import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";
import {ClassroomService} from "../../../../@services/classroom.service";
import {Classroom} from "../../../../@core/models/classroom.model";

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {


  classroomForm: FormGroup;
  submited : boolean = false;
  classroomId: number;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private classroomService : ClassroomService,
  ) { }
  ngOnInit(): void {

    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.route.params.subscribe((params:any) => {
      this.classroomId = params['id'];
      this.classroomService.getById(this.classroomId).subscribe({
        next:course =>{
          this.classroomForm.patchValue(course);
        },
        error: err=>{}
      })
    });


  }

  submit() {
    this.submited=true;
    if(this.classroomForm.valid){
      let classroom: Classroom = this.classroomForm.value;
      classroom = {...classroom,_id:this.classroomId}
      this.classroomService.update(this.classroomId,classroom).subscribe({
        next:(data:any)=>{
          this.router.navigate(['/classroom'])
        },
        error: err => {
        }
      })
    }

  }


}
