import {Component, Input} from '@angular/core';
import {ListCardComponent} from "../list-card/list-card.component";
import {ListCardModel} from "../list-card/list-card.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() cardList: ListCardModel[] = [];

  newList() {
    this.cardList.push({"title": "", "cards": []});
  }
}
