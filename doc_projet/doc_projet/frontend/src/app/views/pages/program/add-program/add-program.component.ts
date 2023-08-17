import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Course} from "../../../../@core/models/course.model";
import {CourseService} from "../../../../@services/course.service";
import {SweetAlertService} from "../../../../@core/shared/sweet-alert.service";
import {ProgramService} from "../../../../@services/program.service";
import {Program} from "../../../../@core/models/program.model";

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  programForm: FormGroup;
  submited : boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService : SweetAlertService,
              private programService : ProgramService,
  ) { }
  ngOnInit(): void {
    this.programForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  getRowClass(row: any, rowIndex: number): string {
    return rowIndex % 2 === 0 ? 'datatable-odd-row' : '';
  }

  submit() {
    this.submited=true;
    if(this.programForm.valid){
      const program: Program = this.programForm.value;
      this.programService.post(program).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Programme ajouté avec succès");
          this.router.navigate(['/program']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
        }
      })
    }
  }
}
