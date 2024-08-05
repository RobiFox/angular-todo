import {Component, Input, Optional, SkipSelf, ViewChild} from '@angular/core';
import {SharedService} from "../shared.service";
import {ListCardComponent} from "../list-card/list-card.component";
import {IndividualCardModel} from "./individual-card.model";
import {HomeComponent} from "../home/home.component";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {ContextMenu} from "primeng/contextmenu";

@Component({
  selector: 'app-individual-card',
  templateUrl: './individual-card.component.html',
  styleUrl: './individual-card.component.css'
})
export class IndividualCardComponent {
  @Input() model!: IndividualCardModel;
  protected contextItems!: MenuItem[];

  constructor(private sharedService: SharedService,
              @Optional() @SkipSelf() public listCard: ListCardComponent,
              @Optional() @SkipSelf() public table: HomeComponent) {
  }

  ngOnInit() {
    this.contextItems = [
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          this.listCard.model.cards.splice(this.listCard.model.cards.indexOf(this.model), 1);
        }
      }
    ]
  }

  onDrag() {
    console.log("dragging");
    this.sharedService.setDraggedComponent(this);
  }

  onDrop(event: any) {
    if (this.listCard === null || this.sharedService.currentDraggedComponent === null) return;
    console.log("individual drop");
    event.stopPropagation();
    this.listCard.moveCardToMe(this.sharedService.currentDraggedComponent, this.listCard.model.cards.indexOf(this.model));
  }

  protected readonly console = console;
}
