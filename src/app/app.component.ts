import { Component } from '@angular/core';
import { BanksService } from './banks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'bankSearchScreen';

  constructor(private bankService: BanksService) { }

}
