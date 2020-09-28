import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { MainApplicationModule } from './application/application.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ModalOfferDetailComponent } from './application/my-offers/modal-offer-detail/modal-offer-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferDetailComponent } from './application/my-offers/offer-detail/offer-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransactionsComponent } from './application/transactions/transactions.component';
import { ModalAddTransactionComponent } from './application/transactions/modal-add-transaction/modal-add-transaction.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectTasksComponent } from './application/project-tasks/project-tasks.component';
import { ModalAddTaskComponent } from './application/project-tasks/modal-add-task/modal-add-task.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    OfferDetailComponent, 
    

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    MainApplicationModule,
 
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressBarModule, MatMenuModule, MatSelectModule
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ModalOfferDetailComponent, ModalAddTransactionComponent, ModalAddTaskComponent]
})
export class AppModule { }
