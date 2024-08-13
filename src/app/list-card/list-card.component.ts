import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {IndividualCardComponent} from "../individual-card/individual-card.component";
import {SharedService} from "../shared.service";
import {ListCardModel} from "./list-card.model";
import {HomeComponent} from "../home/home.component";
import {IndividualCardModel} from "../individual-card/individual-card.model";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent {
  @Input() model!: ListCardModel;

  constructor(private sharedService: SharedService, @Optional() @SkipSelf() public table: HomeComponent) {}

  filteredCards(): IndividualCardModel[] {
    let result: IndividualCardModel[] = this.model.cards;
    console.log("filter " + this.sharedService.assignedFilter.length);
    if(this.sharedService.assignedFilter.length > 0) {
      result = result.filter(card => card.contributor != null && this.sharedService.assignedFilter.includes(card.contributor));
    }
    return result;
  }

  onDrop() {
    console.log("card dropped here");
    if(this.sharedService.currentDraggedComponent === null) {
      console.error("missing dragged component");
      return;
    }
    this.moveCardToMe(this.sharedService.currentDraggedComponent!, 0);
  }

  newCard() {
    console.log("pressed");
    this.model.cards.push({title: ""});
  }

  moveCardToMe(card: IndividualCardComponent, index: number) {
    const sourceIndex = card.listCard.model.cards.indexOf(card.model);
    card.listCard.model.cards.splice(sourceIndex, 1);
    if (index < 0 || index > this.model.cards.length) {
      this.model.cards.push(card.model);
    } else {
      this.model.cards.splice(index, 0, card.model);
    }
    this.table.saveToCookie();
  }

  delete() {
    this.table.cardList.splice(this.table.cardList.indexOf(this.model), 1);
    this.table.saveToCookie();
  }
}
