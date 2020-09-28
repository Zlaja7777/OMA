import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { OfferService } from 'src/app/api-services/offer.service';
import { ClientService } from 'src/app/api-services/client.service';
import { OfferUpsertModel } from 'src/app/shared/Models/offer-upsert.model';
import { Offer } from 'src/app/shared/offer.model';
import { Status } from 'src/app/shared/Models/status.model';
import { StatusService } from 'src/app/api-services/status.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './modal-offer-detail.component.html',
  styleUrls: ['./modal-offer-detail.component.css'],
 
   
})

export class ModalOfferDetailComponent implements OnInit {
  
  id: number;
  offer : Offer = new Offer();
  offerName: string;
  status: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private offerService: OfferService, private clientService: ClientService,
  private statusService: StatusService){}
  ngOnInit(): void {

    this.offerService.GetById(this.data.offerId).subscribe(s=>{
       
      if(s.description.length > 50){
        s.description = s.description.slice(0,60) + "...";
      }
      else{
        s.description = s.description;
      }
       this.offer.setObject(s.name, s.startDate, s.endDate, s.totalPrice,
        s.totalTimeDays, s.totalTimeHours, s.deadlineExceeded, s.description, 
        s.statusId, s.currencyId, s.clientId, s.offerId, s.paid);
        
    })
 

    
  
  }


 
}
