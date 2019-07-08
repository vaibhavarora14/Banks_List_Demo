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
    this.updateBanksServerSide();
  }

  private fetchFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bank_list'));
  }

  private updateBanksServerSide() {
    localStorage.setItem('bank_list', JSON.stringify(this.bankData));
    this.updateChangesWithBanks();
  }

  getBanks() {
    return this.bankData;
  }

  private updateChangesWithBanks() {
    this.banks.next(this.bankData.slice());
  }

  changeFavoriteState(index: number, state: boolean) {
    this.bankData[index].favorite = state;
    this.updateBanksServerSide();
  }
}
