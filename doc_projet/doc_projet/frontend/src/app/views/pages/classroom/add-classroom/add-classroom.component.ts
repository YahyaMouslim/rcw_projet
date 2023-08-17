import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassroomService} from "../../../../@services/classroom.service";
import {Classroom} from "../../../../@core/models/classroom.model";
import {SweetAlertService} from "../../../../@core/shared/sweet-alert.service";
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {
  classroomForm: FormGroup;
  submited : boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService : SweetAlertService,
              private classroomService : ClassroomService,
  ) { }

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      location: ['', Validators.required],
    });
  }



  submit() {
    this.submited=true;
    if(this.classroomForm.valid){
      const classroom: Classroom = this.classroomForm.value;
      this.classroomService.post(classroom).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Salle ajouté avec succès");
          this.router.navigate(['/classroom']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
        }
      })
    }
  }


}
