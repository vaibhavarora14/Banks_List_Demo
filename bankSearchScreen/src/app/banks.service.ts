import { Injectable } from '@angular/core';
import { Bank } from './bank';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private bankData: Bank[];
  bankDataChanged = new Subject<Bank[]>();
  filteredData = new Subject<Bank[]>();
  searchedText = new Subject<string>();
  selectedPaginationPage = 0;

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.bankData = this.fetchFromLocalStorage();
    if (!this.bankData) {
      this.fetchFromAPI();
    } else {
      this.pushBankData();
    }
  }

  async fetchFromAPI() {
    const dataFromAPI = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const dataFromResponse: Bank[] = await dataFromAPI.json();
    this.bankData = dataFromResponse;
    localStorage.setItem('bank_list', JSON.stringify(this.bankData));
    this.pushBankData();
  }

  fetchFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bank_list'));
  }

  getBankData(filteredData?: Bank[]) {
    const data = filteredData ? filteredData : this.bankData;
    if (this.selectedPaginationPage < 1) {
      return data.slice(0, 10);
    } else {
      return data.slice(((this.selectedPaginationPage - 1) * 10 + 1), (this.selectedPaginationPage * 10));
    }
  }

  getBankFullData() {
   return this.bankData.slice();
  }

  pushBankData() {
    this.bankDataChanged.next(this.bankData.slice());
  }

  search(value: string) {
    // this.searchedText.next(value);
    debugger;
    const bankData = this.filterBankData(value);
    this.bankDataChanged.next(this.getBankData(bankData));
    this.filteredData.next(bankData);
  }

  private filterBankData(value: string): Bank[] {
    const filteredBankData = this.getBankFullData().slice();
    if (value.length !== 0) {
      return filteredBankData.filter((obj) => {
        return Object.keys(obj).some((key) => {
          try {
            return obj[key].toUpperCase().includes(value.toUpperCase());
          } catch (e) {
            return false;
          }
        });
      });
    } else {
      return filteredBankData;
    }
  }

  changePage(pageNumber: number) {
    if (pageNumber !== this.selectedPaginationPage) {
      this.selectedPaginationPage = pageNumber;
      this.bankDataChanged.next(this.getBankData());
    }
  }
}
