import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/api-services/country.service';
import { DropDownModel } from 'src/app/shared/dropdown.model';
import { CityService } from 'src/app/api-services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkerUpsertModel } from 'src/app/shared/Models/worker-upsert.model';
import { AddressUpsertModel } from 'src/app/shared/Models/address-upsert.model';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { AddressService } from 'src/app/api-services/address.service';
import { WorkerService } from 'src/app/api-services/worker.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {
  constructor(private countryService: CountryService, private cityService: CityService, private router: Router, private route: ActivatedRoute, private token: JWToken, private addressService: AddressService,
      private workerService: WorkerService) { }
  countries: DropDownModel[] = [];
  cities: DropDownModel[] = [];
  formCityId: number;
  formCountryId: number;
  isLoading = false;
  error: string = null;
  editMode = false;
  workerId  : number;
  @ViewChild('registrationForm') public userFrm: NgForm;

  ngOnInit(): void {
    
    
    this.countryService.GetAll().subscribe(resData => {
      resData.forEach(element => {
        var el = { id: element.countryId, name: element.name };
        this.countries.push(el);
      });
    }, error => {
      console.log(error);
      console.log(error.error);
    });
    if (this.route.snapshot.params['id']) {
      this.editMode = true;
      this.workerId = this.route.snapshot.params['id'];
      this.initForm(this.workerId);
  }
  }
  private initForm(id : number){
    //this.userFrm.controls['clientId'].setValue(data.clientId);

    this.userFrm = new NgForm([], []);
    this.workerService.GetById(id).subscribe(w=>{
      this.addressService.GetById(w.addressId).subscribe(data => {
        this.loadCities(data.countryId);
        this.userFrm.controls['countryId'].setValue(data.countryId);
        this.userFrm.controls['cityId'].setValue(data.cityId);
        this.userFrm.controls['streetNumber'].setValue(data.streetNumber);
        this.userFrm.controls['address'].setValue(data.name);
        this.userFrm.controls['addressId'].setValue(w.addressId);
      });
      this.userFrm.controls['firstName'].setValue(w.firstName)
      this.userFrm.controls['lastName'].setValue(w.lastName)
      this.userFrm.controls['startDate'].setValue(w.startDate)
      this.userFrm.controls['email'].setValue(w.email)
      this.userFrm.controls['bankAccountNumber'].setValue(w.bankAccountNumber)
      this.userFrm.controls['phoneNumber'].setValue(w.phoneNumber)
    })
  }
  loadCities(countryId: number) {
    this.cityService.GetAll(countryId).subscribe(resData => {
      this.cities = [];
      resData.forEach(element => {
        var el = { id: element.cityId, name: element.name };
        this.cities.push(el);
      });
    }, error => {
      console.log(error);
    });
    this.formCityId = undefined;
  }
  onChange(event): void {
    this.cityService.GetAll(event.target.value).subscribe(resData => {
      this.cities = [];
      resData.forEach(element => {
        var el = { id: element.cityId, name: element.name };
        this.cities.push(el);
      });
    }, error => {
      console.log(error);
    });
    this.formCityId = undefined;
  }

  onSubmit() {
    if (!this.userFrm.valid) return;

    
    var appUserId = this.token.getToken();

    
        const numberOfActiveProjects = 0;
        const isActive = true;
        const MaxHoursPerWeek = 0; 
        const MaxHoursPerMonthActual = 0;
        const MaxHoursPerMonthBudgeted = 0
        const Avalibility = "";
        var addressObj = new AddressUpsertModel(this.userFrm.value.address, this.userFrm.value.streetNumber, this.userFrm.value.cityId);
     
        var worker = new WorkerUpsertModel(this.userFrm.value.firstName, this.userFrm.value.lastName,  
                      this.userFrm.value.startDate, numberOfActiveProjects,  isActive, this.userFrm.value.bankAccountNumber,
                      this.userFrm.value.addressId, this.userFrm.value.phoneNumber, Avalibility, this.userFrm.value.email,
                      MaxHoursPerWeek, MaxHoursPerMonthActual, MaxHoursPerMonthBudgeted, appUserId
                      )

      if(!this.editMode){
        this.addressService.Insert(addressObj).subscribe(data => {
          worker.AddressId = data.addressId;

          this.workerService.Insert(worker).subscribe(() => {
            this.router.navigate(['/app/workers']);
          });
        });
      }
      else{
        this.addressService.Insert(addressObj).subscribe(data => {
          worker.AddressId = data.addressId;
     
          this.workerService.Update(this.workerId, worker).subscribe(() => {
            this.router.navigate(['/app/workers/' + this.workerId]);
          });
        });
      }
     
    
  }
}
