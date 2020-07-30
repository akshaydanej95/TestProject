import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(public http: HttpClient, private location: Location) { }

  getTableData() {
    return this.http.get<Data>("assets/data.json");
  }

  postTableData(data: BasicData) {
    return this.http.post<Data>("assets/data.json", data);
  }

  putTableData(data: BasicData) {
    return this.http.put<Data>("assets/data.json", data);
  }

  back() {
    this.location.back();
  }
}

export class Data {
  data: BasicData[];
}

export class BasicData {
  id: number;
  name: string;
  phone: string;
  address: Address;
}

export class Address {
  city: string;
  address_line1: string;
  address_line2: string;
  postal_code: string;
}
