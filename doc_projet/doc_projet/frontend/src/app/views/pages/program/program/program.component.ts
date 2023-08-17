import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {Course} from "../../../../@core/models/course.model";
import {Router} from "@angular/router";
import {ProgramService} from "../../../../@services/program.service";
import { Program } from 'src/app/@core/models/program.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows : Program[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private temp: any=[];

  constructor(
    private programService : ProgramService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingIndicator = true;
    this.programService.get().subscribe({
      next:(data:Program[])=>{
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
    this.programService.delete(row._id).subscribe({
      next:()=>{
        this.fetch();
      },
      error: err => {
      }
    })
  }

  onEdit(row: Program) {
    this.router.navigate(['/program/edit', row._id]);
  }

  updateFilter(event: any) {
    const val : any = event?.target?.value?.toLowerCase();
    this.rows = this.temp.filter((d:any)=> {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

}
