import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Weather} from '../model/weather';

@Injectable()
export class WeatherService {

  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private readonly apiKey = '32eb210aae9c50d65743816e97d1c6a8';

  constructor(
    private http: HttpClient,
  ) {
  }

  getWeather(city: string): Observable<Weather> {
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', this.apiKey);
    return this.http.get<Weather>(this.apiUrl + 'weather', {
      params:
      options
    });
  }


}
