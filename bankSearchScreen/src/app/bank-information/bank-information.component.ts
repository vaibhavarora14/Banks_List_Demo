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
  displayedColumns: string[];
  dataSource = new MatTableDataSource<Bank>();
  bankNames: string[];
  searchValue: string;
  selectValue: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private bankService: BanksService) {
    this.displayedColumns = this.bankService.getBankColumns();
    this.bankNames = this.bankService.getBankNames();
   }

  ngOnInit() {
    this.dataSource.data = this.bankService.getBanks();
    this.dataSource.paginator = this.paginator;
    this.bankService.banks.subscribe(
      (bankData: Bank[]) => {
        this.dataSource.data = bankData;
      }
    );
  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    this.selectValue = '0';
  }

  changeFavoriteState(index: number, state: boolean) {
    this.bankService.changeFavoriteState(index, state);
  }

  setBankSelected(event) {
    if (event.value === 0) {
      return this.dataSource.filter = '';
    }
    this.dataSource.filter = event.value.trim().toLowerCase();
    this.searchValue = '';
  }

  changePagination(event) {
    const value = parseInt(event.target.value);
    if (Number.isInteger(value) && value > 0) {
      this.dataSource.paginator._changePageSize(value);
    }
  }

}

