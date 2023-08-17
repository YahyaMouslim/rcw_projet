import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {User} from "../../../../@core/models/user.model";
import {Course} from "../../../../@core/models/course.model";
import {Program} from "../../../../@core/models/program.model";
import {Classroom} from "../../../../@core/models/classroom.model";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {ScheduleDtoModel} from "../../../../@core/models/scheduleDto.model";
import {CourseService} from "../../../../@services/course.service";
import {AuthService} from "../../../../@services/auth.service";
import {ProgramService} from "../../../../@services/program.service";
import {ClassroomService} from "../../../../@services/classroom.service";
import {ScheduleService} from "../../../../@services/schedule.service";
import {Router} from "@angular/router";
import {Schedule} from "../../../../@core/models/schedule.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {

  professors : User[];
  courses : Course[];
  programs : Program[];
  salles : Classroom[];
  private loadingIndicator: boolean=false;
  private datas: ScheduleDtoModel[];


  constructor(
    private courseService : CourseService,
    private userService : AuthService,
    private programService : ProgramService,
    private classRoomService : ClassroomService,
    private scheduleService : ScheduleService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2)
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
        this.datas = data.map(item => ({
          ...item,
          classroom: this.salles?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.classroom)),
          professor: this.professors?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.professor)),
          program: this.programs?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.program)),
          course: this.courses?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.course))
        })) as ScheduleDtoModel[];
        this.loadingIndicator = false;
       // this.generatePDF(rows)
        //this.generateAndDownloadPDF(rows);

      },
      error: err => {
        this.loadingIndicator = false;
      }
    })
  }


  download(){
    this.generateCSV(this.datas);
  }



  getProgramDropDown(){
    this.programService.get().subscribe({
      next:program=>{
        this.programs=program;
      }
    });
  }

  getCourseDropDown(){
    this.courseService.get().subscribe({
      next:course=>{
        this.courses=course;
      }
    });
  }


  getClassRoomDropDown(){
    this.classRoomService.get().subscribe({
      next: salle =>{
        this.salles=salle;
        // this.selectedSalle = this.salleItems.length > 0 ? this.salleItems[0] : null;
      }
    });
  }

  getProfDropDown(){
    this.userService.getProfessors().subscribe({
      next: (prof:any) =>{
        this.professors=prof;
        // this.selectedProf = this.profItems.length > 0 ? this.profItems[0] : null;
      }
    });
  }




  removeWhiteSpace = (str:any) => str.split('').filter((char:any) => char !== ' ').join('');






  generateCSV( data: any[]) {
    // Flatten the data
    const flattenedData = this.flattenData(data);

    // Generate the CSV
    const csvContent = this.convertArrayToCSV(flattenedData);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.csv';
    link.click();

    window.URL.revokeObjectURL(url);
    link.remove();
  }

  flattenData(data: any[]): any[] {
    const flattenedData = [];
    for (const item of data) {
      const flatItem = {
        Programme: item.program?.name, // Assuming program is an object with a 'name' property
        Cours: item.course?.name,   // Assuming course is an object with a 'name' property
        Salle: item.classroom?.name, // Assuming classroom is an object with a 'name' property
        Professeur: item.professor?.firstName + ' ' + item.professor?.lastName, // Assuming professor is an object with 'firstName' and 'lastName' properties
        Jour: item?.day,
        'A partir de': item?.startTime,
        'jusqu\'au': item?.endTime
      };
      flattenedData.push(flatItem);
    }
    return flattenedData;
  }

  convertArrayToCSV(data: any[]): string {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(';'));

    for (const row of data) {
      const values = headers.map(header => this.sanitizeCSVValue(row[header]));
      csvRows.push(values.join(';'));
    }

    return csvRows.join('\n');
  }

  sanitizeCSVValue(value: any): string {
    if (typeof value === 'string') {
      value = value.replace(/"/g, '""');
      if (value.includes(';') || value.includes('"') || value.includes('\n')) {
        value = `"${value}"`;
      }
    }
    return String(value);
  }
}







