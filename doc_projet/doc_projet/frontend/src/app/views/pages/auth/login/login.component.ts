import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ParticlesConfig} from '../particles-config';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../@services/auth.service";
import {UserCredentials} from "../../../../@core/models/user-credentials.model";

declare let particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  returnUrl: any;
  loginForm: FormGroup;
  submited : boolean = false;
  displaySigninLoading: boolean=false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService : AuthService,
              ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
    this.invokeParticles();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login() {
    this.submited=true;
    this.displaySigninLoading=true;
    if(this.loginForm.valid){
      const userCredentials : UserCredentials ={
        email : this.loginForm.value.username,
        password : this.loginForm.value.password
      }
      this.authService.authenticate(userCredentials).subscribe({
        next:(res:any)=>{
          this.authService.successLoggedIn(res.token);
          localStorage.setItem('id',res?.id)
          this.router.navigate(['apps']);
          this.displaySigninLoading=false;

        },
        error:(err:any) => {
          this.displaySigninLoading=false;
          console.log(err);
        }
      })
    } else this.displaySigninLoading=false;



  }


  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }

}
