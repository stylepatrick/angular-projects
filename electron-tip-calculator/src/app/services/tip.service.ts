import {Injectable} from '@angular/core';
import {TipHead} from '../models/tip-head';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  tipHead: TipHead = null;

  constructor() {
  }

  getTipHead() {
    if (this.tipHead == null) {
      this.tipHead = {tips: [], totDays: null, totTip: null};
    }
    return this.tipHead;
  }
}
