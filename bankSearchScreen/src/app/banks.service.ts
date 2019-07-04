import { Injectable } from '@angular/core';
import { Bank } from './bank';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  bankData: Bank[];

  constructor() {
    this.fetchData();
  }

  fetchData() {
    this.bankData = this.fetchFromLocalStorage();
    console.log('-- Fetched from LocalStorage --');
    console.log(this.bankData);
    if (!this.bankData) {
      this.fetchFromAPI();
    }
  }

  async fetchFromAPI() {
    const dataFromAPI = await fetch('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI');
    const dataFromResponse: Bank[] = await dataFromAPI.json();
    this.bankData = dataFromResponse;
    localStorage.setItem('bank_list', JSON.stringify(this.bankData));
    console.log('-- Fetched from API --');
    console.log(this.bankData);
  }

  fetchFromLocalStorage() {
    return JSON.parse(localStorage.getItem('bank_list'));
  }
}
