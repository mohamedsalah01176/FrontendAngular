import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank-navbar',
  imports: [RouterModule],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css',
})
export class BlankNavbarComponent {
  // _AuthService = inject(AuthService);
}
