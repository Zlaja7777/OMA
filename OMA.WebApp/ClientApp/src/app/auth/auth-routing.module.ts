import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetMessageComponent } from './password-reset-message/password-reset-message.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { ResetSuccessMessageComponent } from './reset-success-message/reset-success-message.component';


const routes: Routes = [
  { path: 'account', component: AuthComponent , children: 
  [
    { path: '', redirectTo: '/account/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path : 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'forgot-message', component: PasswordResetMessageComponent },
    { path: 'password-reset', component: PasswordResetComponent },
    { path: 'reset-successful', component: ResetSuccessMessageComponent }
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
