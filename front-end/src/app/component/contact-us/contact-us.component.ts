import { Component, inject, OnInit } from '@angular/core';
import { NavLinksComponent } from '../nav-links/nav-links.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [NavLinksComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  url: string = '';
  ngOnInit() {
    this.url = this._ActivatedRoute.snapshot.routeConfig?.path as string;
  }
}
