import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/api-services/client.service';
import { ClientModel } from 'src/app/shared/client.model';
import { AddressModel } from 'src/app/shared/address-model';
import { OfferService } from 'src/app/api-services/offer.service';
import { OfferClientDetail } from 'src/app/shared/Models/offer-client-detail.model';
import { StatusService } from 'src/app/api-services/status.service';
import { CurrencyService } from 'src/app/api-services/currency.service';
import { AddressService } from 'src/app/api-services/address.service';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { WorkerModel } from 'src/app/shared/worker-model';
import { WorkerService } from 'src/app/api-services/worker.service';
import { TestObject } from 'protractor/built/driverProviders';
import { ProjectTasksComponent } from '../../project-tasks/project-tasks.component';
import { ProjectTasksService } from 'src/app/api-services/project-tasks.service';
import { OfferWorkerDetail } from 'src/app/shared/Models/offer-worker-detail.model';
import { off } from 'process';
import { WorkerUpsertModel } from 'src/app/shared/Models/worker-upsert.model';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {
  worker: WorkerModel = new WorkerModel();
  clientAddress: AddressModel = new AddressModel();
  offerList: OfferWorkerDetail[] = [];
  id: number;
  activeProjects : number;
  numberOfProjects: number;
  finishedProjects: number;
  paidProjects: number;
  remainingToPay: number;
  loggedUser = false;
  constructor(private route: ActivatedRoute, private workerService: WorkerService, private offerService: OfferService,
    private statusService: StatusService, private currencyService: CurrencyService, private router: Router, private addressService: AddressService,  private token: JWToken,
    private projectTaskService: ProjectTasksService) { }

  checkUser(token: string, loggedUser: string){
    return token != loggedUser;
  }
  ngOnInit(): void {


    this.id = +this.route.snapshot.params['id'];
    this.workerService.GetById(this.id).subscribe(data => {
      if(this.checkUser(this.token.getToken(), data.appUserId)){
        this.loggedUser = true;
        return;
      }

      this.worker.setWorkerData(data.workerId, data.firstName, data.lastName, data.numberOfActiveProjects, data.email, data.phoneNumber, data.bankAccountNumber, data.isActive ,data.addressId);

      this.addressService.GetById(data.addressId).subscribe(data => {
        this.worker.setAddressData(data.name, data.streetNumber, data.city, data.country);
      });
      this.offerService.GetByUserId(this.token.getToken()).subscribe(o => {
        
        o.forEach(el => {
          this.projectTaskService.GetAll(el.offerId).subscribe(s=>{
            s.forEach(el2=>{
              if(el2.workerId == data.workerId){
                var offerElement: OfferWorkerDetail = new OfferWorkerDetail();
                offerElement.OfferId = el.offerId;
                offerElement.Name = el.offerName;
                offerElement.Paid = el2.paid;
                offerElement.Position = el2.name;
                offerElement.WorkDays = el2.workDays;
                offerElement.Amount = el2.amount.toString() +"  " +  el.currency;
                this.offerList.push(offerElement);
              }
            });
          });
         
        });
        
      });

    });
  }
  Remove(id : number){
    const nowIsActive = false;
    this.workerService.GetById(id).subscribe(s=>{
      var worker = new WorkerUpsertModel( s.firstName, s.lastName,  
        s.startDate, s.numberOfActiveProjects,  nowIsActive, s.bankAccountNumber,
        s.addressId, s.phoneNumber, s.availability, s.email,
        s.maxHoursPerWeek, s.maxHoursPerMonthActual, s.maxHoursPerMonthBudgeted, s.appUserId
        )
        this.workerService.Update(id, worker).subscribe(()=>{
          this.router.navigate(["/app/workers"]);
        })
    });

  }



  // onRemove() {
  //   this.clientService.ChangeStatus(this.id).subscribe(() => {
  //     this.router.navigate(["/app/clients"]);
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}
