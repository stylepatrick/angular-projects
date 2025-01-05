import { Component } from '@angular/core';
import {Card, CardListComponent} from 'stylepatrick-ui-controls';
import { assassins } from './assassins';
import {FormsModule} from '@angular/forms';
import {CopyButtonComponent} from '../../projects/stylepatrick-ui-controls/src/lib/copy-button/copy-button.component';

@Component({
  selector: 'app-root',
  imports: [CardListComponent, CopyButtonComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stylepatrick-ui-cdk';

  cards: Card[] = assassins;

  onCardChange(cards: Card[]) {
    console.log(cards);
  }

  log() {
    alert(this.title + ' copied to the clipboard');
  }
}
