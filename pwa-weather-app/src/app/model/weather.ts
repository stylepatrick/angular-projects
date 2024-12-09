import {WeatherInfo} from './weather-info';

export interface Weather {
  weather: WeatherInfo[],
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string
  };
  name: string;
}
