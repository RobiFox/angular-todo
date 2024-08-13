import {Component, Input} from '@angular/core';
import {ListCardModel} from "../list-card/list-card.model";
import {CookieService} from "ngx-cookie-service";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() cardList: ListCardModel[] = [];
  menuBar: any[] = [];

  ngAfterContentInit() {
    this.setMenuBar();
  }

  setMenuBar() {
    this.menuBar = [
      {
        label: 'Filter',
        items: [...this.contributors()]
      }
    ];
  }

  constructor(private cookieService: CookieService, private sharedService: SharedService) {
    let saved = this.cookieService.get("table");
    if (saved.length === 0) return;

    this.cardList = JSON.parse(saved);
  }

  saveToCookie() {
    this.cookieService.set("table", JSON.stringify(this.cardList));
  }

  newList() {
    this.cardList.push({title: "", cards: []});
    this.saveToCookie();
  }

  public getColors(): string[] {
    let colors: string[] = [];
    for (let i = 0; i < this.cardList.length; i++) {
      for (let j = 0; j < this.cardList[i].cards.length; j++) {
        let c = this.cardList[i].cards[j].color;
        if (c != null && !colors.includes(c)) {
          colors.push(c);
        }
      }
    }
    console.log(colors);
    return colors;
  }

  public getContributors(): string[] {
    let contributors: string[] = [];
    for (let i = 0; i < this.cardList.length; i++) {
      for (let j = 0; j < this.cardList[i].cards.length; j++) {
        let c = this.cardList[i].cards[j].contributor;
        if (c != null && !contributors.includes(c)) {
          contributors.push(c);
        }
      }
    }
    console.log(contributors);
    return contributors;
  }

  public contributors() {
    let contributors = ["Unassigned", ...this.getContributors()];
    return contributors.map(e => ({
      label: e, icon: this.sharedService.assignedFilter.includes(e) ? 'pi pi-fw pi-check' : '', command: () => {
        if (this.sharedService.assignedFilter.includes(e)) {
          this.sharedService.assignedFilter.splice(this.sharedService.assignedFilter.indexOf(e), 1);
        } else {
          this.sharedService.assignedFilter.push(e);
        }
        this.setMenuBar();
      }
    }));
  }
}
