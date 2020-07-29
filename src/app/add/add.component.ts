import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ServicesService, BasicData, Address } from '../employees/services.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  basicData: BasicData = new BasicData();
  addressObj: Address = new Address();

  constructor(private formBuilder: FormBuilder, private _service: ServicesService, private location: Location) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      city: ['',],
      address_line1: ['',],
      address_line2: ['',],
      postal_code: ['',],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('ADDED SUCCESSFULLY!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.basicData.name = this.registerForm.value.name;
    this.basicData.phone = this.registerForm.value.phone;
    this.addressObj.address_line1 = this.registerForm.value.address_line1;
    this.addressObj.address_line2 = this.registerForm.value.address_line2;
    this.addressObj.city = this.registerForm.value.city;
    this.addressObj.postal_code = this.registerForm.value.postal_code;
    this.basicData.address = this.addressObj;
    this._service.postTableData(this.basicData).subscribe(() => {
      this.back();
    });
  }

  back() {
    this.location.back();
  }
}
