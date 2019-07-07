import { Component, OnInit } from '@angular/core';
import { Bank } from '../bank';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-bank-information',
  templateUrl: './bank-information.component.html',
  styleUrls: ['./bank-information.component.scss']
})
export class BankInformationComponent implements OnInit {
  bankData: Bank[] = [];
  searchedText = '';

  constructor(private bankService: BanksService) { }

  ngOnInit() {
    this.bankData = this.bankService.getBankData();
    this.bankService.bankDataChanged.subscribe(
      (bankData: Bank[]) => {
        this.bankData = bankData;
      }
    );
    console.log(this.bankData);

    this.bankService.searchedText.subscribe(
      (value: string) => this.searchedText = value
    );
  }

}
