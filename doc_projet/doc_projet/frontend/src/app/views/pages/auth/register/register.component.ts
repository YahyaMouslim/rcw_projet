import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SweetAlertService} from "../../../../@core/shared/sweet-alert.service";
import {CourseService} from "../../../../@services/course.service";
import {Course} from "../../../../@core/models/course.model";
import {AuthService} from "../../../../@services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  submited : boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private alertService : SweetAlertService,
              private authService : AuthService,
  ) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  submit() {
    this.submited=true;
    if(this.userForm.valid){
      const fullName = this.userForm.value.firstName+" "+this.userForm.value.lastName
      const user: any = {...this.userForm.value,fullName}; //INSTRUCTOR
      this.authService.register(user).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Utilisateur ajouté avec succès un email a été envoyé a votre boite mail pour activation de votre compte");
          this.router.navigate(['/course']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
        }
      })
    }
  }

}
