import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner.component';
import { MainApplicationModule } from '../application/application.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetMessageComponent } from './password-reset-message/password-reset-message.component';
import { ResetSuccessMessageComponent } from './reset-success-message/reset-success-message.component';

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        LoadingSpinnerComponent, 
        ForgotPasswordComponent, PasswordResetComponent, PasswordResetMessageComponent, ResetSuccessMessageComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        HttpClientModule,
        MainApplicationModule
    ]
})

export class AuthModule {
}