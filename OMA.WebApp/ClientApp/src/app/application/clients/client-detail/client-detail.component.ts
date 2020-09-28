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

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: ClientModel = new ClientModel();
  clientAddress: AddressModel = new AddressModel();
  offerList: OfferClientDetail[] = [];
  id: number;
  activeProjects : number;
  numberOfProjects: number;
  finishedProjects: number;
  paidProjects: number;
  remainingToPay: number;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private offerService: OfferService,
    private statusService: StatusService, private currencyService: CurrencyService, private router: Router, private addressService: AddressService,  private token: JWToken) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.clientService.GetById(this.id).subscribe(data => {
      this.client.setClientData(data.clientId, data.firstName, data.lastName, data.companyName, data.email, data.phoneNumber, data.bankAccountNumber, data.iban, data.swift, data.addressId);

      this.addressService.GetById(data.addressId).subscribe(data => {
        this.client.setAddressData(data.name, data.streetNumber, data.city, data.country);
      });

      this.offerService.GetAll(data.clientId).subscribe(data => {
        data.forEach(el => {
          var offerElement: OfferClientDetail = new OfferClientDetail();
          offerElement.OfferId = el.offerId;
          offerElement.Name = el.name;

          this.statusService.GetById(el.statusId).subscribe(data => {
            offerElement.Status = data.name;
          });
          this.currencyService.GetById(el.currencyId).subscribe(data => {
            offerElement.Price = el.totalPrice.toString() + " " + data.tag;
          });
          this.offerList.push(offerElement);
        });
      });
    });
    var appUserID = this.token.getToken();
    this.clientService.CounterOfProjects(this.id, appUserID).subscribe(s =>{
        this.activeProjects = s.activeProjects;
        this.numberOfProjects = s.numberOfProjects;
        this.finishedProjects = s.finishedProjects;
        this.paidProjects = s.paidProjects;
        this.remainingToPay = s.remainingToPay;
        
    });

  }



  onRemove() {
    this.clientService.ChangeStatus(this.id).subscribe(() => {
      this.router.navigate(["/app/clients"]);
    }, error => {
      console.log(error);
    });
  }
}
