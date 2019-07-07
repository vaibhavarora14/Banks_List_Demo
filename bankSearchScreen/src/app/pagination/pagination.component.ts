import { Component } from '@angular/core';
import { Bank } from '../bank';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  paginationNumbers: number;
  paginationArray: string[];

  constructor(private bankService: BanksService) {
    this.updatePaginationArray(bankService.getBanksCount());
    this.bankService.filteredBanks.subscribe(
      (banksData: Bank[]) => {
        this.updatePaginationArray(banksData.length);
      }
    );
  }

  updatePaginationArray(banksCount: number) {
    this.paginationNumbers = Math.round(banksCount / 10);
    this.paginationArray = new Array(this.paginationNumbers);
  }

  changePagination(pageNumber: number) {
      this.bankService.changePage(pageNumber);
  }
}
