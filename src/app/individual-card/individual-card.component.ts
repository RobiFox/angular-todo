import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {SharedService} from "../shared.service";
import {ListCardComponent} from "../list-card/list-card.component";

@Component({
  selector: 'app-individual-card',
  templateUrl: './individual-card.component.html',
  styleUrl: './individual-card.component.css'
})
export class IndividualCardComponent {
  @Input() description: string = '';
  @Input() placeholder: boolean = false;

  constructor(private sharedService: SharedService, @Optional() @SkipSelf() private listCard: ListCardComponent) {}

  onDrag() {
    console.log("dragging");
    this.sharedService.setDraggedComponent(this);
  }

  onDrop() {
    if(this.listCard === null) return;
    this.listCard.moveCardToMe(this, 0);
  }
}
