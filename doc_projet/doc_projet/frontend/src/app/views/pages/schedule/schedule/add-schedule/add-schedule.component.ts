import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SweetAlertService} from "../../../../../@core/shared/sweet-alert.service";
import {CourseService} from "../../../../../@services/course.service";
import {AuthService} from "../../../../../@services/auth.service";
import {ProgramService} from "../../../../../@services/program.service";
import {ClassroomService} from "../../../../../@services/classroom.service";
import {ScheduleService} from "../../../../../@services/schedule.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  scheduleForm: FormGroup;
  submited : boolean = false;

  programItems: any = [];
  selectedProgram: any = null;
  courseItems: any = [];
  selectedCourse: any = null;
  profItems: any = [];
  selectedProf: any = null;
  salleItems: any = [];
  selectedSalle: any = null;
  selectedDate: NgbDateStruct;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService : SweetAlertService,
              private courseService : CourseService,
              private userService : AuthService,
              private programService : ProgramService,
              private classRoomService : ClassroomService,
              private scheduleService : ScheduleService,
  ) { }
  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      program: [null, Validators.required],
      course: [null, Validators.required],
      classroom: [null, Validators.required],
      professor: [null, Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.getProgramDropDown() ;
    this.getCourseDropDown();
    this.getClassRoomDropDown();
    this.getProfDropDown();

    //
  }


  getRowClass(row: any, rowIndex: number): string {
    return rowIndex % 2 === 0 ? 'datatable-odd-row' : '';
  }

  submit() {
    this.submited=true;
    if(this.scheduleForm.valid){

      const form=this.scheduleForm.value
      const emploi ={...form,
        programId:form.program.value._id,
        courseId:form.course.value._id,
        professorId:form.professor.value._id,
        classroomId:form.classroom.value._id,
      }

      this.scheduleService.post(emploi).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Planifier avec succès");
          this.router.navigate(['/schedule']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. un confit d\'emploi du temps.')
        }
      })
    }
  }



  getProgramDropDown(){
    this.programService.get().subscribe({
      next:program=>{
        this.programItems = program.map(p=>{ return {name:p.name, value:p }} );
        // this.selectedProgram = this.programItems.length > 0 ? this.programItems[0] : null;
      }
    });
  }

  getCourseDropDown(){
    this.courseService.get().subscribe({
      next:course=>{
        this.courseItems = course.map(c=>{ return {name:c.name, value:c }} );
        // this.selectedCourse = this.courseItems.length > 0 ? this.courseItems[0] : null;
      }
    });
  }

  getClassRoomDropDown(){
    this.classRoomService.get().subscribe({
      next: salle =>{
        this.salleItems = salle.map(s=>{ return {name:s.name, value:s }} );
        // this.selectedSalle = this.salleItems.length > 0 ? this.salleItems[0] : null;
      }
    });
  }

  getProfDropDown(){
    this.userService.getProfessors().subscribe({
      next: (prof:any) =>{
        this.profItems = prof.map((p:any)=>{ return {name:p.firstName+" "+p.lastName, value:p }} );
        // this.selectedProf = this.profItems.length > 0 ? this.profItems[0] : null;
      }
    });
  }

}
