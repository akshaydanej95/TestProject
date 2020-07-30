import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private _service: ServicesService, public router: Router) { }
  tableData: any;
  data: any[];
  newTableData: any[] = [];
  service: any;

  ngOnInit() {
    this.service = this._service.getTableData().subscribe((result) => {
      this.tableData = result.data;
      for (var i = 0; i < this.tableData.length; i++) {
        this.newTableData.push({ "id": this.tableData[i].id, "name": this.tableData[i].name, "phone": isNaN(parseInt(this.tableData[i].phone)) ? 'NA' : this.tableData[i].phone, "city": this.tableData[i].address.city, "address_line1": this.tableData[i].address.address_line1, "address_line2": this.tableData[i].address.address_line2, "postal_code": this.tableData[i].address.postal_code });
      }
      this.data = this.newTableData;
    });
  }

  search(term: string) {
    if (!term) {
      this.newTableData = this.data;
    } else {
      this.newTableData = this.data.filter(x => x.name.trim().toLowerCase().includes(term.trim().toLowerCase()) || x.city.trim().toLowerCase().includes(term.trim().toLowerCase()) );
    }
  }
  
  add() {
    this.router.navigateByUrl("add");
  }

  edit(id) {
    this.router.navigate(['edit', { id: id }]);
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
