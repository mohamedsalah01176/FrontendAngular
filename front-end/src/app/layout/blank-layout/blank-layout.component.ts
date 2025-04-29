import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from "../../component/blank-navbar/blank-navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, BlankNavbarComponent, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
