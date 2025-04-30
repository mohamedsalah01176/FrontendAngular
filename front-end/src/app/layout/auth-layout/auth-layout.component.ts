import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from "../../component/auth-navbar/auth-navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthNavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
