import { Route } from '@angular/router';
import { OneComponent } from './one/one.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPoi from './+state/poi.reducer';
import { PoiEffects } from './+state/poi.effects';
import { provideHttpClient } from '@angular/common/http';
import { PoiService } from './poi.service';

export const oneRoutes: Route[] = [
  {
    path: '',
    component: OneComponent,
    providers: [
      provideState(fromPoi.POI_FEATURE_KEY, fromPoi.poiReducer),
      provideEffects(PoiEffects),
      provideHttpClient(),
      PoiService
    ],
  },
];
