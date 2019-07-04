import { Injectable } from '@angular/core';
import { Bank } from './bank';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private bankData: Bank[];
  bankDataChanged = new Subject<Bank[]>();
  searchedText = new Subject<string>();

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

  getBankData() {
    return this.bankData.slice();
  }

  pushBankData() {
    this.bankDataChanged.next(this.bankData.slice());
  }

  search(value: string) {
    this.searchedText.next(value);
  }
}
