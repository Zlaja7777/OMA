import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/api-services/country.service';
import { DropDownModel } from 'src/app/shared/dropdown.model';
import { CityService } from 'src/app/api-services/city.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private countryService: CountryService, private cityService: CityService, private authService: AuthService, private router: Router) { }
  countries: DropDownModel[] = [];
  cities: DropDownModel[] = [];
  formCityId: number;
  formCountryId: number;
  isLoading = false;
  error: string = null;
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

    this.isLoading = true;
    this.authService.signUp(this.userFrm.value).subscribe(() => {
      this.router.navigate(['/account/login']);
      this.isLoading = false;
    }, error => {
      console.log(error);
      if(typeof(error.error) == "string") {
        this.error = error.error;
      } else {
        this.error = "An unknown error occured!";
      }
      this.isLoading = false;
    });
  }
}
