import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  email: string;
  token: string;
  alertDanger = false;
  pw = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams.newEmail;
    this.token = this.route.snapshot.queryParams.token;

    if (!this.token) {
      this.alertDanger = true;
    }
  }

  onSubmit(form: NgForm): void {
    if (!form.valid || !this.email || !this.token) {
      return;
    }

    this.authService.resetPassword({
      ConfirmPassword: form.value.confirmPassword, Password: form.value.password,
      Email: this.email, Token: this.token
    }).subscribe(() => {
   
      this.router.navigate(['/account/reset-successful']);
    });
  }
  CheckPw(pw: string, form : NgForm){

    if(pw != form.value.password){
      this.pw = true;
    }
    else{
      this.pw = false;
    }
  }
}
