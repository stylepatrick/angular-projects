import {Routes} from '@angular/router';
import {TipComponent} from './components/tip.component';

export const routes: Routes = [
  {path: '', component: TipComponent},
  {path: '**', component: TipComponent},
];
