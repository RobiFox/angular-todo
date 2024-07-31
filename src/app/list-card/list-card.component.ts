import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {IndividualCardComponent} from "../individual-card/individual-card.component";
import {SharedService} from "../shared.service";
import {IndividualCardModel} from "../individual-card/individual-card.model";
import {ListCardModel} from "./list-card.model";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent {
  @Input() model!: ListCardModel;

  constructor(private sharedService: SharedService) {}

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
    this.model.cards.push({description: ""});
  }

  moveCardToMe(card: IndividualCardComponent, index: number) {

  }
}
