import { Component } from '@angular/core';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private bankService: BanksService) { }

  filter(value: string) {
    this.bankService.search(value);
  }

}
