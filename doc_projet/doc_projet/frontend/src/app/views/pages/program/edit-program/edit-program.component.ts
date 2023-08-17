import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";
import {ProgramService} from "../../../../@services/program.service";
import {Program} from "../../../../@core/models/program.model";

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss']
})
export class EditProgramComponent implements OnInit {

  programForm: FormGroup;
  submited : boolean = false;
  programId: number;

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private programService : ProgramService,
  ) { }
  ngOnInit(): void {

    this.programForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.params.subscribe((params:any) => {
      this.programId = params['id']; // Convert to a number
      console.log('Received ID:', this.programId);

      this.programService.getById(this.programId).subscribe({
        next:program =>{
          this.programForm.patchValue(program);
        },
        error: err=>{}
      })
    });


  }

  submit() {
    this.submited=true;
    if(this.programForm.valid){
      let program: Program = this.programForm.value;
      program = {...program,_id:this.programId}
      this.programService.update(this.programId,program).subscribe({
        next:(data:any)=>{
          this.router.navigate(['/program'])
        },
        error: err => {

        }
      })
    }
  }

}
