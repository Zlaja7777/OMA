import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  @ViewChild('resetForm') public resetForm: NgForm;
  ngOnInit(): void {

  }

  onSubmit(form: NgForm): void {
    this.authService.forgotPassword(form.value.email).subscribe(() => {
      this.router.navigate(['/account/forgot-message']);
    });
  }
}
