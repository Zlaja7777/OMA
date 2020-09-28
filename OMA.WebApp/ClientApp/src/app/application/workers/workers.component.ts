import { Component, OnInit } from '@angular/core';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { WorkerService } from 'src/app/api-services/worker.service';
import { AddressService } from 'src/app/api-services/address.service';
import { WorkersListModel } from 'src/app/shared/Models/workers-list.model';
import { Offer } from 'src/app/shared/offer.model';
import { OfferService } from 'src/app/api-services/offer.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  workersList: WorkerList[] = [];
  appUserId: string;
  checkUserLogged: boolean;
  constructor(private token: JWToken, private workerService: WorkerService, private addressService: AddressService, private offerService: OfferService) { }

  checkUser(user: string, loggedUser: string){
    return user == loggedUser;
  }
  ngOnInit(): void {

    this.appUserId = this.token.getToken();
   
    this.workerService.GetByAppUserId(this.appUserId).subscribe(resData => {

      resData.forEach(el => {
        if(el.isActive){
            var obj = new WorkersListModel();
            this.addressService.GetById(el.addressId).subscribe(data => {
              obj.FullName = el.firstName + " " + el.lastName;
              obj.PhoneNumber = el.phoneNumber;
              obj.WorkerId = el.workerId;
              obj.City = data.city;
              this.workersList.push(obj);
            });
        }
      });
    });
  }
  onKeyPress(sent: string){


    this.workerService.GetByAppUserId(this.appUserId).subscribe(resData => {
      this.workersList = [];
      resData.forEach(el => {
        var name = el.firstName + ""+ el.lastName;
       
        
        if(sent.toLowerCase() == name.slice(0, sent.length).toLowerCase()){
          
          this.addressService.GetById(el.addressId).subscribe(data => {
                  
            this.workersList.push({FullName: name, 
            WorkerId: el.workerId, PhoneNumber: el.phoneNumber,  City: data.city});
          });
          
        }
     
      });
          
    });
    
  }
}
interface WorkerList{
   FullName: string,
   WorkerId: number,
   PhoneNumber: string, 
   City: string
}