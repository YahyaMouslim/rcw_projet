import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {CalendarOptions, EventApi} from '@fullcalendar/angular';
import {ScheduleService} from "../../../../@services/schedule.service";
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
import {Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('externalEvents', {static: true}) externalEvents: ElementRef;

  professors : User[];
  courses : Course[];
  programs : Program[];
  salles : Classroom[];

  constructor(
    private courseService : CourseService,
    private userService : AuthService,
    private programService : ProgramService,
    private classRoomService : ClassroomService,
    private scheduleService : ScheduleService,
    private router: Router)
  {}


  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Liste'
    },
    initialView: 'timeGridWeek',
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    businessHours: {
      startTime: '10:00', // 8 AM
      endTime: '20:00'   // 8 PM
    },
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    //initialDate: new Date().toISOString().split('T')[0],
    locale: 'fr'
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  exampleEvents : any = []

  ngOnInit(): void {
    this.initDropdown();
  }



  async initDropdown() {
    try {
      await Promise.all([
        this.getProgramDropDown() ,
        this.getCourseDropDown(),
        this.getClassRoomDropDown(),
        //this.getProfDropDown()
      ]);

      this.getData();

    } catch (error) {
      console.error('Error initializing dropdown:', error);
    }
  }


  getData(){
    this.scheduleService.get().subscribe((res) => {

      let rows = res.map(item => ({
        ...item,
        classroom: this.salles?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.classroom)),
        professor: this.professors?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.professor)),
        program: this.programs?.find(p => this.removeWhiteSpace(p._id) === this.removeWhiteSpace(item.program)),
        course: this.courses?.find(c => this.removeWhiteSpace(c._id) === this.removeWhiteSpace(item.course))
      })) as ScheduleDtoModel[];

      this.calendarOptions.events = rows.map((event, index) => {
        const startDate = this.getDateForDayOfWeek(event.day, event.startTime);
        const endDate = this.getDateForDayOfWeek(event.day, event.endTime);
        return {
          id: index,
          start: startDate,
          end: endDate,
          title: event.course.name+' [ '+event.program.name+" ]",
          backgroundColor: this.getRandomColor(0.2),
          borderColor: '#fd7e14',
          display: 'block',
        };
      }) as any;
    });
  }



  getDateForDayOfWeek(dayOfWeek:any, targetTime:any) {
    const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const targetDayIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase());

    if (targetDayIndex === -1) {
      throw new Error('Jour de la semaine invalide');
    }

    const daysToAdd = targetDayIndex >= currentDayOfWeek ?   7 - (currentDayOfWeek - targetDayIndex) : targetDayIndex - currentDayOfWeek;
    today.setDate(today.getDate() + daysToAdd);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return `${formattedDate}T${targetTime}:00`;
  }



  getRandomColor(opacity: number): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},${opacity})`;
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
      }
    });
  }


  removeWhiteSpace = (str:any) => str.split('').filter((char:any) => char !== ' ').join('');

}
