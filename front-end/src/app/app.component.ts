import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from "./component/auth-navbar/auth-navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
