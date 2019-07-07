import { Injectable } from '@angular/core';
import { Bank } from './bank';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private bankData: Bank[];
  private filteredBanksData: Bank[];
  private selectedPaginationPage = 0;

  banks = new Subject<Bank[]>();
  filteredBanks = new Subject<Bank[]>();

  constructor() {
    this.fetchData();
  }

  private fetchData() {
    this.bankData = this.fetchFromLocalStorage();
    if (!this.bankData) {
      this.fetchFromAPI();
    } else {
      this.updateChangesWithBanks();
    }
  }

  private async fetchFromAPI() {
    const dataFromAPI = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const dataFromResponse: Bank[] = await dataFromAPI.json();
    this.bankData = dataFromResponse;
    localStorage.setItem('bank_list', JSON.stringify(this.bankData));
    this.updateChangesWithBanks();
  }

  private fetchFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bank_list'));
  }

  getBanksForSelectedPage(filteredBanks?: Bank[]) {
    const data = filteredBanks ? filteredBanks : this.bankData;
    if (this.selectedPaginationPage < 1) {
      return data.slice(0, 10);
    } else {
      const startingNumber = (this.selectedPaginationPage - 1) * 10;
      const endingNumber = this.selectedPaginationPage * 10;
      return data.slice(startingNumber > 0 ? startingNumber + 1 : startingNumber, endingNumber);
    }
  }

  getBanksCount() {
    return this.bankData.length;
  }

  private updateChangesWithBanks() {
    this.banks.next(this.bankData.slice());
  }

  search(value: string) {
    this.selectedPaginationPage = 0;
    this.filteredBanksData = this.filterBankData(value);
    this.banks.next(this.getBanksForSelectedPage(this.filteredBanksData));
    this.filteredBanks.next(this.filteredBanksData);
  }

  private filterBankData(value: string): Bank[] {
    const filteredBankData = this.bankData.slice();
    if (value.length !== 0) {
      return filteredBankData.filter((obj) => {
        return Object.keys(obj).some((key) => {
          return obj[key].toString().toUpperCase().includes(value.toUpperCase());
        });
      });
    } else {
      return filteredBankData;
    }
  }

  changePage(pageNumber: number) {
    if (pageNumber !== this.selectedPaginationPage) {
      this.selectedPaginationPage = pageNumber;
      this.banks.next(this.getBanksForSelectedPage(this.filteredBanksData));
    }
  }
}
