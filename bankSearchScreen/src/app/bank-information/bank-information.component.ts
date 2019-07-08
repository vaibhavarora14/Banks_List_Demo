import { Component, OnInit, ViewChild } from '@angular/core';
import { Bank } from '../bank';
import { BanksService } from '../banks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss']
})
export class BankInformationComponent implements OnInit {
  displayedColumns: string[] = ['IFSC', 'Id', 'Branch', 'Address', 'City', 'District', 'State', 'Bank name'];
  dataSource = new MatTableDataSource<Bank>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private bankService: BanksService) { }

  ngOnInit() {
    this.dataSource.data = this.bankService.getBanks();
    this.dataSource.paginator = this.paginator;
    this.bankService.banks.subscribe(
      (bankData: Bank[]) => {
        this.dataSource.data = bankData;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

