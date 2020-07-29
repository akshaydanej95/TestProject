import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService, BasicData, Address } from '../employees/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any;
  formData: any[];
  registerForm: FormGroup;
  submitted = false;
  basicData: BasicData = new BasicData();
  addressObj: Address = new Address();

  constructor(public route: ActivatedRoute, private _service: ServicesService, private formBuilder: FormBuilder, private location: Location) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {

    this._service.getTableData().subscribe((result) => {
      debugger;
      var tableData = result.data;
      var formData = tableData.find(x => x.id == this.id);
      //this.registerForm.name
      this.registerForm = this.formBuilder.group({
        name: [formData.name, [Validators.required, Validators.minLength(4)]],
        phone: [formData.phone, Validators.required],
        city: [formData.address.city,],
        address_line1: [formData.address.address_line1,],
        address_line2: [formData.address.address_line2,],
        postal_code: [formData.address.postal_code,],
      });
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('UPDATE SUCCESSFULLY!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.basicData.name = this.registerForm.value.name;
    this.basicData.phone = this.registerForm.value.phone;
    this.addressObj.address_line1 = this.registerForm.value.address_line1;
    this.addressObj.address_line2 = this.registerForm.value.address_line2;
    this.addressObj.city = this.registerForm.value.city;
    this.addressObj.postal_code = this.registerForm.value.postal_code;
    this.basicData.address = this.addressObj;
    this._service.putTableData(this.basicData).subscribe(() => {
      this.back();
    });
  }

  back() {
    this.location.back();
  }
}
