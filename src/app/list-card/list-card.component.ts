import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent {
  @Input() title: string = '';
  @Input() placeholder: boolean = false;
}
