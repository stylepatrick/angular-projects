import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PoiEntity, PoiSelectors } from '@monorepongrx/one';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-two',
  imports: [CommonModule],
  templateUrl: './two.component.html',
  styleUrl: './two.component.css',
})
export class TwoComponent {
  protected poi$: Observable<PoiEntity | undefined> | undefined;

  constructor(
    private store: Store
  ) {
    this.poi$ = this.store.select(PoiSelectors.selectEntity);
  }
}
