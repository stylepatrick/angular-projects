import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Weather App PWA </span>
      <span class="spacer"></span>
      <button mat-icon-button>
        <mat-icon>refresh</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>share</mat-icon>
      </button>
    </mat-toolbar>`,
  standalone: true,
  styles: `
    .spacer {
      flex: 1 1 auto;
    }`
})
export class HeaderComponent {

}
