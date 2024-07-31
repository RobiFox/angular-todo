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

  onDrop() {
    if(this.listCard === null) return;
    this.listCard.moveCardToMe(this, 0);
  }
}
