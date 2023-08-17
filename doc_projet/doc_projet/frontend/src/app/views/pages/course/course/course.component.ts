import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows : Course[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private temp: any=[];

  constructor(
    private courseService : CourseService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingIndicator = true;
    this.courseService.get().subscribe({
      next:(data:Course[])=>{
        this.rows = data;
        this.temp = [...data];
        this.loadingIndicator = false;
      },
      error: err => {
        this.loadingIndicator = false;
      }
    })
  }


  onDelete(row: Course) {
    this.courseService.delete(row._id).subscribe({
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
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }
}
