import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PoiActions, PoiEntity, PoiSelectors } from '../../index';
import { Observable } from 'rxjs';
import { TwoComponent } from '../two/two.component';

@Component({
  selector: 'lib-one',
  imports: [CommonModule, TwoComponent],
  templateUrl: './one.component.html',
  styleUrl: './one.component.css',
})
export class OneComponent implements OnInit {
  protected pois$: Observable<PoiEntity[]>;

  constructor(private store: Store) {
    // load all Pois
    this.pois$ = this.store.select(PoiSelectors.selectAllPoi);
    // store selected Poi
    this.store.dispatch(PoiActions.selectPoi({ poiId: 1 }));
  }

  ngOnInit(): void {
    // init Pois from Effects
    this.store.dispatch(PoiActions.initPoi());
  }
}
