import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SweetAlertService} from "../../../../../@core/shared/sweet-alert.service";
import {AuthService} from "../../../../../@services/auth.service";

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.scss']
})
export class AddProfessorComponent implements OnInit {

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
      const user: any = {...this.userForm.value,fullName,role:'INSTRUCTOR'};
      this.authService.register(user).subscribe({
        next:(data:any)=>{
          this.alertService.successful("Utilisateur ajouté avec succès un email a été envoyé a votre boite mail pour activation de votre compte");
          this.router.navigate(['/professor']);
        },
        error: err => {
          this.alertService.error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
        }
      })
    }
  }

}
