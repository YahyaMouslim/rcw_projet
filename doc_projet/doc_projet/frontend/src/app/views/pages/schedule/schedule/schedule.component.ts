import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {Course} from "../../../../@core/models/course.model";
import {CourseService} from "../../../../@services/course.service";
import {Router} from "@angular/router";
import {ProgramService} from "../../../../@services/program.service";
import {ClassroomService} from "../../../../@services/classroom.service";
import {AuthService} from "../../../../@services/auth.service";
import {ScheduleService} from "../../../../@services/schedule.service";
import {Schedule} from "../../../../@core/models/schedule.model";
import {User} from "../../../../@core/models/user.model";
import {Program} from "../../../../@core/models/program.model";
import {Classroom} from "../../../../@core/models/classroom.model";
import {ScheduleDtoModel} from "../../../../@core/models/scheduleDto.model";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  programItems: any = [];
  selectedProgram: any = null;
  courseItems: any = [];
  selectedCourse: any = null;
  profItems: any = [];
  selectedProf: any = null;
  salleItems: any = [];
  selectedSalle: any = null;

  professors : User[];
  courses : Course[];
  programs : Program[];
  salles : Classroom[];


  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows : ScheduleDtoModel[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private temp: any=[];

  constructor(
    private courseService : CourseService,
    private userService : AuthService,
    private programService : ProgramService,
    private classRoomService : ClassroomService,
    private scheduleService : ScheduleService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.initDropdown();
  }

  async initDropdown() {
    try {
      await Promise.all([
        this.getProgramDropDown() ,
        this.getCourseDropDown(),
        this.getClassRoomDropDown(),
        this.getProfDropDown()
      ]);

      this.fetch();
    } catch (error) {
      console.error('Error initializing dropdown:', error);
    }
  }


  fetch() {
    this.loadingIndicator = true;
    this.scheduleService.get().subscribe({
      next:(data:Schedule[])=>{
        this.rows = data.map(item => ({
          ...item,
          classroom: this.salles?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.classroom)),
          professor: this.professors?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.professor)),
          program: this.programs?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.program)),
          course: this.courses?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.course))
        })) as ScheduleDtoModel[];

        this.temp = [...this.rows];
        this.loadingIndicator = false;
      },
      error: err => {
        this.loadingIndicator = false;
      }
    })
  }


  onDelete(row: Course) {
    this.scheduleService.delete(row._id).subscribe({
      next:()=>{
        this.fetch();
      },
      error: err => {
      }
    })
  }

  onEdit(row: Course) {
    this.router.navigate(['/course/edit', row._id]);
  }

  updateFilter(event: any) {
    const val : any = event?.target?.value?.toLowerCase();
    this.rows = this.temp.filter((d:any)=> {
      return d.program.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  getProgramDropDown(){
    this.programService.get().subscribe({
      next:program=>{
        this.programs=program;
        this.programItems = program.map(p=>{ return {name:p.name, value:p }} );
       // this.selectedProgram = this.programItems.length > 0 ? this.programItems[0] : null;
      }
    });
  }

  getCourseDropDown(){
    this.courseService.get().subscribe({
      next:course=>{
        this.courses=course;
        this.courseItems = course.map(c=>{ return {name:c.name, value:c }} );
       // this.selectedCourse = this.courseItems.length > 0 ? this.courseItems[0] : null;
      }
    });
  }

  getClassRoomDropDown(){
    this.classRoomService.get().subscribe({
      next: salle =>{
        this.salles=salle;
        this.salleItems = salle.map(s=>{ return {name:s.name, value:s }} );
       // this.selectedSalle = this.salleItems.length > 0 ? this.salleItems[0] : null;
      }
    });
  }

  getProfDropDown(){
    this.userService.getProfessors().subscribe({
      next: (prof:any) =>{
        this.professors=prof;
        this.profItems = prof.map((p:any)=>{ return {name:p.firstName+" "+p.lastName, value:p }} );
       // this.selectedProf = this.profItems.length > 0 ? this.profItems[0] : null;
      }
    });
  }




  removeWhiteSpace = (str:any) => str.split('').filter((char:any) => char !== ' ').join('');



  filterData() {
    const selectedProperties = [
      this.selectedProf,
      this.selectedProgram,
      this.selectedSalle,
      this.selectedCourse
    ];
    const filters = selectedProperties.filter(property => !!property);

    console.log(filters)

    this.rows = this.temp.filter((row: any) =>
      filters.every(filter => {
        switch (filter) {
          case this.selectedProgram:
            return this.removeWhiteSpace(row.program._id) === this.removeWhiteSpace(filter.value._id);
          case this.selectedCourse:
            return this.removeWhiteSpace(row.course._id) === this.removeWhiteSpace(filter.value._id);
          case this.selectedProf:
            return this.removeWhiteSpace(row.professor._id) === this.removeWhiteSpace(filter.value._id);
          case this.selectedSalle:
            return this.removeWhiteSpace(row.classroom._id) === this.removeWhiteSpace(filter.value._id);
          default:
            return true;
        }
      })
    );


  }




}
