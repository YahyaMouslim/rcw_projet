import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {Router} from "@angular/router";
import {ClassroomService} from "../../../../@services/classroom.service";
import {Classroom} from "../../../../@core/models/classroom.model";

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows : Classroom[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private temp: any=[];

  constructor(
    private classroomService : ClassroomService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingIndicator = true;
    this.classroomService.get().subscribe({
      next:(data:Classroom[])=>{
        this.rows = data;
        this.temp = [...data];
        this.loadingIndicator = false;
      },
      error: err => {
        this.loadingIndicator = false;
      }
    })
  }


  onDelete(row: Classroom) {
    this.classroomService.delete(row._id).subscribe({
      next:()=>{
        this.fetch();
      },
      error: err => {
      }
    })
  }

  onEdit(row: Classroom) {
    this.router.navigate(['/classroom/edit', row._id]);
  }

  updateFilter(event: any) {
    const val : any = event?.target?.value?.toLowerCase();
    this.rows = this.temp.filter((d:any)=> {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

}
