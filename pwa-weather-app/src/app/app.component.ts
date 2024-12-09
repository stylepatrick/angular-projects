import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {filter, map, switchMap} from 'rxjs';
import {HeaderComponent} from './component/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pwa-weather-app';

  constructor(private updates: SwUpdate, private snackbar:
    MatSnackBar) {
  }

  ngOnInit() {
    this.updates.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      switchMap(() => this.snackbar.open('A new version isavailable!', 'Update now').afterDismissed()),
      filter(result => result.dismissedByAction),
      map(() => this.updates.activateUpdate().then(() => location.reload()))
    ).subscribe();
  }
}
