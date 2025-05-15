import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-main-dashboard',
  imports: [NgxChartsModule],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css',
})
export class MainDashboardComponent {
  view: [number, number] = [400, 250];
  Staticview: [number, number] = [400, 250];
  gaugeData = [
    {
      name: 'Sales',
      value: 65,
    },
  ];
  colorScheme = 'vivid';

   Staticsdata = [
    { name: 'Product 1', value: 100 },
    { name: 'Product 2', value: 150 },
    { name: 'Product 3', value: 80 },
    { name: 'Product 4', value: 200 }
  ];

  // customColorScheme = {
  //   domain: ['#ff6600', '#66ccff', '#ffcc00', '#009933']
  // };
}
