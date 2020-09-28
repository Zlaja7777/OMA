import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { WorkersComponent } from './workers/workers.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ModalOfferDetailComponent } from './my-offers/modal-offer-detail/modal-offer-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressBarModule}  from 'node_modules/@angular/material/progress-bar';
import { OfferDetailComponent } from './my-offers/offer-detail/offer-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ModalAddTransactionComponent } from './transactions/modal-add-transaction/modal-add-transaction.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectDetailComponent } from './my-projects/project-detail/project-detail.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ModalAddTaskComponent } from './project-tasks/modal-add-task/modal-add-task.component';
import { AddWorkerComponent } from './workers/add-worker/add-worker.component';
import { WorkerDetailComponent } from './workers/worker-detail/worker-detail.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [
        ApplicationComponent,
        DashboardComponent,
        NavigationComponent,
        CreateOfferComponent,
        MyOffersComponent,
        WorkersComponent,
        SettingsComponent,
        MainNavComponent,
        ClientsComponent,
        ClientEditComponent,
        ClientDetailComponent,
        ModalOfferDetailComponent, 
        TransactionsComponent, 
        ModalAddTransactionComponent, 
        MyProjectsComponent, 
        ProjectDetailComponent, 
        ProjectTasksComponent, 
        ModalAddTaskComponent, 
        AddWorkerComponent,
        WorkerDetailComponent,
    ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        HttpClientModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
        FormsModule,
        MatProgressBarModule,
        MatDialogModule, MatMenuModule, MatSelectModule
    ],
     entryComponents: [ModalOfferDetailComponent, ModalAddTransactionComponent]
})

export class MainApplicationModule {
}