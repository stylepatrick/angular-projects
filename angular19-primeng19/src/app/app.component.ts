import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {Fluid} from 'primeng/fluid';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, Fluid, InputText],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular19-primeng19';
}
