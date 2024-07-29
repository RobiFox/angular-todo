import {Component, Input, Optional, SkipSelf} from '@angular/core';
import {IndividualCardComponent} from "../individual-card/individual-card.component";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent {
  @Input() title: string = '';
  @Input() placeholder: boolean = false;

  constructor(private sharedService: SharedService) {}

  onDrop() {
    console.log("card dropped here");
    if(this.sharedService.currentDraggedComponent === null) {
      console.error("missing dragged component");
      return;
    }
    this.moveCardToMe(this.sharedService.currentDraggedComponent!, 0);
  }

  moveCardToMe(card: IndividualCardComponent, index: number) {

  }
}
