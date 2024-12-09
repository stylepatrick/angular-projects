import {Component} from '@angular/core';
import {WeatherService} from '../service/weather.service';
import {Weather} from '../model/weather';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [
    MatIconModule,
    MatInputModule,
    MatCardModule,
    CommonModule
  ],
  template: `
    <mat-form-field>
      <input matInput placeholder="Enter city" #cityCtrl (keydown.enter)="search(cityCtrl.value)">
      <mat-icon matSuffix (click)="search(cityCtrl.value)">search</mat-icon>
    </mat-form-field>
    <mat-card *ngIf="weather">
      <mat-card-header>
        <mat-card-title>{{ weather.name }}, {{ weather.sys.country }}</mat-card-title>
        <mat-card-subtitle>{{ weather.weather[0].main }}</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="https://openweathermap.org/img/wn/{{weather.weather[0].icon}}@2x.png" [alt]="weather.weather[0].main">
      <mat-card-content>
        <h1>{{ weather.main.temp | number:'1.0-0' }} &#8451;</h1>
        <p>Pressure : {{ weather.main.pressure }} hPa</p>
        <p>Humidity : {{ weather.main.humidity }} %</p>
        <p>Wind : {{ weather.wind.speed }} m/s</p>
      </mat-card-content>
    </mat-card>
  `,
  standalone: true,
  providers: [WeatherService],
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 25px;
    }
    mat-form-field {
      width: 20%;
    }
    mat-icon {
      cursor: pointer;
    }
    mat-card {
      margin-top: 30px;
      width: 250px;
    }
    h1 {
      text-align: center;
      font-size: 2.5em;
    }

  `
})
export class WeatherComponent {

  weather: Weather | undefined;

  constructor(private weatherService: WeatherService) {
  }

  search(city: string) {
    this.weatherService.getWeather(city).subscribe(weather => this.weather = weather);
  }

}
