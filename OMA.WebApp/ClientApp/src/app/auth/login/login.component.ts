import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;
  @ViewChild('loginForm') public loginForm: NgForm;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/app/dashboard']);
    }
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(resData => {
      localStorage.setItem('token', resData.token);
      this.router.navigate(['/app/dashboard']);
      this.isLoading = false;
    }, error => {
      if(error.status == 400) {
        this.error = error.error.message;
      } else {
        this.error = "An unknown error occured."
        console.log(error);
      }
      this.isLoading = false;
    });
  }
}
