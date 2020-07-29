import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(public http: HttpClient) { }

  getTableData() {
    return this.http.get<Data>("assets/data.json");
  }

  postTableData(data: BasicData) {
    return this.http.post<Data>("assets/data.json", data);
  }

  putTableData(data: BasicData) {
    return this.http.put<Data>("assets/data.json", data);
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
