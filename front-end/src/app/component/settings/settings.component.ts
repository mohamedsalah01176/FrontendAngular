import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  imports: [FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  edit = faPenNib;
}
