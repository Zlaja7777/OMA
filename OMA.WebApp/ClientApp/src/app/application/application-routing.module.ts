import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { WorkersComponent } from './workers/workers.component';
import { SettingsComponent } from './settings/settings.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { OfferDetailComponent } from './my-offers/offer-detail/offer-detail.component';
import{TransactionsComponent} from 'src/app/application/transactions/transactions.component';
import { MyProjectsComponent } from 'src/app/application/my-projects/my-projects.component';
import { ProjectDetailComponent } from './my-projects/project-detail/project-detail.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { AddWorkerComponent } from './workers/add-worker/add-worker.component';
import { WorkerDetailComponent } from './workers/worker-detail/worker-detail.component';

const routes: Routes = [
    {
        path: 'app', component: ApplicationComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'create-offer', component: CreateOfferComponent },
            { path: 'my-offers', component: MyOffersComponent },
            { path: 'clients', component: ClientsComponent},
            { path: 'clients/new', component: ClientEditComponent},
            { path: 'clients/:id', component: ClientDetailComponent},
            { path: 'clients/:id/edit', component: ClientEditComponent},
            { path: 'workers', component: WorkersComponent },
            { path: 'settings', component: SettingsComponent },
            {path:  'my-offers/:id', component: OfferDetailComponent},
            {path: 'transactions/:id', component: TransactionsComponent},
            {path: 'create-offer/:id/edit', component: CreateOfferComponent},
            {path: 'my-projects', component: MyProjectsComponent},
            {path: 'my-projects/:id', component: ProjectDetailComponent},
            {path: 'project-tasks/:id', component: ProjectTasksComponent},
            {path: 'workers/new', component: AddWorkerComponent},
            {path: 'workers/:id', component: WorkerDetailComponent},
            {path: 'workers/:id/edit', component: AddWorkerComponent},
            {path: 'my-projects/:id/status', component: MyProjectsComponent},

            {path: 'my-offers/:id/status', component: MyOffersComponent},
            


        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule { }
