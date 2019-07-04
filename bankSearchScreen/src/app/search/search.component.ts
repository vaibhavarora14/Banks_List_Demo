import { Component, OnInit } from '@angular/core';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private bankService: BanksService) { }

  ngOnInit() {
  }

  filter(value: string) {
    this.bankService.search(value);
  }

}
