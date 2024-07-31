import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {SharedService} from "../shared.service";
import {ListCardComponent} from "../list-card/list-card.component";
import {IndividualCardModel} from "./individual-card.model";

@Component({
  selector: 'app-individual-card',
  templateUrl: './individual-card.component.html',
  styleUrl: './individual-card.component.css'
})
export class IndividualCardComponent {
  @Input() model!: IndividualCardModel;

  constructor(private sharedService: SharedService, @Optional() @SkipSelf() public listCard: ListCardComponent) {}

  onDrag() {
    console.log("dragging");
    this.sharedService.setDraggedComponent(this);
  }

  onDrop(event: any) {
    if(this.listCard === null || this.sharedService.currentDraggedComponent === null) return;
    console.log("individual drop");
    event.stopPropagation();
    this.listCard.moveCardToMe(this.sharedService.currentDraggedComponent, this.listCard.model.cards.indexOf(this.model));
  }
}
