import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoiEntity } from '@monorepongrx/one';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<PoiEntity[]> {
    console.log("init pois service")
    return this.http.get<PoiEntity[]>('poi.json');
  }
}
