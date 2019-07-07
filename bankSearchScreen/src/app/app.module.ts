import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyButtonModule } from '@alyle/ui/button';
import { LyCommonModule } from '@alyle/ui';
import { LyGridModule } from '@alyle/ui/grid';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BankInformationComponent } from './bank-information/bank-information.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PaginationComponent,
    BankInformationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LyThemeModule.setTheme('minima-light'),
    LyButtonModule,
  ],
  providers: [{ provide: LY_THEME, useClass: MinimaLight, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

