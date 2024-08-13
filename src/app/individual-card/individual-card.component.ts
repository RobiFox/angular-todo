import {Component, Input, Optional, Renderer2, SkipSelf, ViewChild} from '@angular/core';
import {SharedService} from "../shared.service";
import {ListCardComponent} from "../list-card/list-card.component";
import {IndividualCardModel} from "./individual-card.model";
import {HomeComponent} from "../home/home.component";
import {MenuItem} from "primeng/api";
import {share} from "rxjs";

@Component({
  selector: 'app-individual-card',
  templateUrl: './individual-card.component.html',
  styleUrl: './individual-card.component.css'
})
export class IndividualCardComponent {
  @Input() model!: IndividualCardModel;
  protected contextItems!: MenuItem[];
  public displayColorPicker: boolean = false;
  public displayAdvanced: boolean = false;

  constructor(protected sharedService: SharedService,
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
      },
      {
        separator: true
      },
      {
        label: "Set Color",
        icon: "pi pi-eye",
        command: () => {
          this.displayColorPicker = true;
        }
      }
    ]
  }

  isMultiSelected(): boolean {
    return this.sharedService.multiSelected.includes(this);
  }

  cardClick(event: MouseEvent) {
    console.log("mouse up");
    if(event.shiftKey) {
      if (this.isMultiSelected()) {
        this.sharedService.multiSelected.splice(this.sharedService.multiSelected.indexOf(this), 1);
      } else {
        this.sharedService.multiSelected.push(this);
      }
      return;
    }
    this.sharedService.multiSelected = [];
    this.displayAdvanced = true;
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

  hexToRgb(hex: string): { r: number, g: number, b: number } {
    hex = hex.toString().replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  rgbToHsv(r: number, g: number, b: number): { h: number, s: number, v: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const v = max;

    if (delta !== 0) {
      if (max === r) {
        h = (g - b) / delta;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      h /= 6;
      if (h < 0) {
        h += 1;
      }
      if (h > 1) {
        h -= 1;
      }

      s = max === 0 ? 0 : delta / max;
    }

    return { h: h, s, v };
  }

  contrastingColor(hex: string): string {
    const { r, g, b } = this.hexToRgb(hex);
    let { v } = this.rgbToHsv(r, g, b);
    // TODO better contrast
    v = 1 - v;
    v *= 0.5;
    v += 0.25;
    v = Math.floor(v * 255);
    let value = v.toString(16).padStart(2, '0').toUpperCase();
    return `#${value}${value}${value}`;
  }

  colorChange(color?: string) {
    if(color != null) {
      this.model.color = color;
    }
    this.sharedService.multiSelected.forEach(s => {
      s.model.color = this.model.color;
    });
    this.table.saveToCookie();
  }

  protected readonly share = share;
}
