import { Component, OnInit } from '@angular/core';
import { Bank } from '../bank';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  paginationNumbers: number;
  paginationArray: string[];

  constructor(private bankService: BanksService) {
    const banks = bankService.getBankFullData();
    this.paginationNumbers = Math.round(banks.length / 10);
    this.paginationArray = new Array(this.paginationNumbers);

    this.bankService.filteredData.subscribe(
      (banksData: Bank[]) => {
        debugger;
        this.paginationNumbers = Math.round(banksData.length / 10);
        this.paginationArray = new Array(this.paginationNumbers);
      }
    );
  }

  ngOnInit() {
  }
  changePagination(pageNumber: number) {
    if (this.bankService.selectedPaginationPage === pageNumber) {
      return false;
    } else {
      this.bankService.changePage(pageNumber);
    }
  }

}
