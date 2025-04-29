import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-daishboard',
  imports: [SideNavComponent,RouterOutlet],
  templateUrl: './daishboard.component.html',
  styleUrl: './daishboard.component.css'
})
export class DaishboardComponent {

}
