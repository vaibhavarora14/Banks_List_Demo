import { Injectable } from '@angular/core';
import { Bank } from './bank';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  private bankData: Bank[];

  banks = new Subject<Bank[]>();

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

  getBanks() {
    return this.bankData;
  }

  private updateChangesWithBanks() {
    this.banks.next(this.bankData.slice());
  }
}
