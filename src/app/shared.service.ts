import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IndividualCardComponent} from "./individual-card/individual-card.component";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private draggedComponent = new BehaviorSubject<IndividualCardComponent | null>(null);
  draggedComponent$ = this.draggedComponent.asObservable();
  setDraggedComponent(component: any) {
    this.draggedComponent.next(component);
  }
  get currentDraggedComponent(): IndividualCardComponent | null {
    return this.draggedComponent.getValue();
  }
  constructor() { }
}
