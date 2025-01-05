import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from '../card';
import {CommonModule} from '@angular/common';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-card-list',
  imports: [CommonModule, DragDropModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  @Input() cards: Card[] = [];

  @Output() cardChange = new EventEmitter<Card[]>();

  sortCards(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cards, event.previousIndex, event.
      currentIndex);
    this.cardChange.emit(this.cards);
  }

}
