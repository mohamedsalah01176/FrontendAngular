import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../util/services/auth.service';

@Component({
  selector: 'app-blank-navbar',
  imports: [RouterModule],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css',
})
export class BlankNavbarComponent {
  _AuthService = inject(AuthService);
}
