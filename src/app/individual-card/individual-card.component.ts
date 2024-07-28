import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-individual-card',
  templateUrl: './individual-card.component.html',
  styleUrl: './individual-card.component.css'
})
export class IndividualCardComponent {
  @Input() description: string = '';
  @Input() placeholder: boolean = false;
}
