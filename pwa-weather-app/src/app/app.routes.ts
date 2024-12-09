import {Routes} from '@angular/router';
import {WeatherComponent} from './component/weather.component';

export const routes: Routes = [
  {path: '', component: WeatherComponent},
  {path: '**', component: WeatherComponent},
];
