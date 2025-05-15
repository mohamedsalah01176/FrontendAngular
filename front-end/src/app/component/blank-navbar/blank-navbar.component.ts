import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../util/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../util/interfaces/iproduct';

@Component({
  selector: 'app-blank-navbar',
  imports: [RouterModule],
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css',
})
export class BlankNavbarComponent {
  _AuthService = inject(AuthService);
  isAdmin: boolean = false;

  token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];

  ngOnInit(): void {
    const user = jwtDecode<DecodedToken>(this.token as string);
    if (user.role === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
