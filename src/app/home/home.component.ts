import {Component, Input} from '@angular/core';
import {ListCardComponent} from "../list-card/list-card.component";
import {ListCardModel} from "../list-card/list-card.model";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() cardList: ListCardModel[] = [];

  constructor(private cookieService: CookieService) {
    let saved = this.cookieService.get("table");
    if(saved.length === 0) return;

    this.cardList = JSON.parse(saved);
  }

  saveToCookie() {
    this.cookieService.set("table", JSON.stringify(this.cardList));
  }

  newList() {
    this.cardList.push({"title": "", "cards": []});
    this.saveToCookie();
  }
}
