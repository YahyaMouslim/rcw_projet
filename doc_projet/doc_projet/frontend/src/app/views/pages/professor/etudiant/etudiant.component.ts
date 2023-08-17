import {Component, OnInit, ViewChild} from '@angular/core';
import {ColumnMode, DatatableComponent} from "@swimlane/ngx-datatable";
import {User} from "../../../../@core/models/user.model";
import {AuthService} from "../../../../@services/auth.service";
import {Router} from "@angular/router";
import {Course} from "../../../../@core/models/course.model";
import {Program} from "../../../../@core/models/program.model";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {


  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows : User[];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  private temp: any=[];

  constructor(
    private profService : AuthService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loadingIndicator = true;
    this.profService.getEtudiant().subscribe({
      next:(data:User[])=>{
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
    this.profService.delete(row._id).subscribe({
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
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

}
