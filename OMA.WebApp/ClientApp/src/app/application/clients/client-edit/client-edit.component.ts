import { Component, OnInit, ViewChild } from '@angular/core';
import { DropDownModel } from 'src/app/shared/dropdown.model';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/api-services/country.service';
import { CityService } from 'src/app/api-services/city.service';
import { ClientUpsertModel } from 'src/app/shared/Models/client-upsert.model';
import { JWToken } from 'src/app/api-services/jwtoken.service';
import { AddressService } from 'src/app/api-services/address.service';
import { AddressUpsertModel } from 'src/app/shared/Models/address-upsert.model';
import { ClientService } from 'src/app/api-services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  editMode = false;
  countries: DropDownModel[] = [];
  cities: DropDownModel[] = [];
  formCityId: number;
  formCountryId: number;
  @ViewChild('clientForm') public userFrm: NgForm;
  id: number;

  constructor(private countryService: CountryService, private cityService: CityService,
    private token: JWToken, private addressService: AddressService, private clientService: ClientService,
    private router: Router, private route: ActivatedRoute) { }

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
      this.id = +this.route.snapshot.params['id'];
      this.initForm();
    }
  }

  onChange(event) {
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

  onSubmit() {
    if (!this.userFrm.valid) return;
    var appUserId = this.token.getToken();

    var addressObj = new AddressUpsertModel(this.userFrm.value.address, this.userFrm.value.streetNumber, this.userFrm.value.cityId);

    var client = new ClientUpsertModel(this.userFrm.value.firstName, this.userFrm.value.lastName, this.userFrm.value.companyName,
      this.userFrm.value.email, this.userFrm.value.phoneNumber, this.userFrm.value.bankAccountNumber,
      this.userFrm.value.iban, this.userFrm.value.swift, this.userFrm.value.addressId, appUserId);

    if (this.editMode) {
      this.addressService.Update(this.userFrm.value.addressId, addressObj).subscribe();
      this.clientService.Update(this.id, client).subscribe(() => {
        this.router.navigate(['/app/clients/' + this.id]);
      });
    } else {
      this.addressService.Insert(addressObj).subscribe(data => {
        client.AddressId = data.addressId;
        this.clientService.Insert(client).subscribe(() => {
          this.router.navigate(['/app/clients']);
        });
      });
    }
  }

  private initForm() {
    this.userFrm = new NgForm([], []);
    this.clientService.GetById(this.id).subscribe(data => {
      this.addressService.GetById(data.addressId).subscribe(data => {
        this.loadCities(data.countryId);
        this.userFrm.controls['countryId'].setValue(data.countryId);
        this.userFrm.controls['cityId'].setValue(data.cityId);
        this.userFrm.controls['streetNumber'].setValue(data.streetNumber);
        this.userFrm.controls['address'].setValue(data.name);
        this.userFrm.controls['addressId'].setValue(data.addressId);
      });
      this.userFrm.controls['firstName'].setValue(data.firstName);
      this.userFrm.controls['lastName'].setValue(data.lastName);
      this.userFrm.controls['bankAccountNumber'].setValue(data.bankAccountNumber);
      this.userFrm.controls['companyName'].setValue(data.companyName);
      this.userFrm.controls['email'].setValue(data.email);
      this.userFrm.controls['iban'].setValue(data.iban);
      this.userFrm.controls['phoneNumber'].setValue(data.phoneNumber);
      this.userFrm.controls['swift'].setValue(data.swift);
      this.userFrm.controls['clientId'].setValue(data.clientId);
    }, error => {
      console.log(error);
    });
  }
}