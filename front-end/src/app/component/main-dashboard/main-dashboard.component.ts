import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService } from './../../util/services/dashboard.service';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken, Iproduct } from '../../util/interfaces/iproduct';

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
      value: 75,
    },
  ];
  colorScheme = 'vivid';

  Staticsdata: { name: string; value: number }[] = [];

  usersOrders = [
    {
      _id: '',
      products: [{ title: '', adminId: '', price: 0 }],
      total: '',
      createdAt: '',
      userId: '',
    },
  ];

  constructor(private DashboardService: DashboardService) {}

  adminID = '';
  allAdminProducts: number = 0;
  productList: Iproduct[] = [];
  ngOnInit(): void {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userToken='))
      ?.split('=')[1];

    if (!token) {
      throw new Error('User token not found in cookies');
    }

    const decodedToken = jwtDecode<DecodedToken>(token);
    this.adminID = decodedToken.userID;

    this.DashboardService.getAllAdminOrders(decodedToken.userID).subscribe({
      next: (res) => {
        this.usersOrders = res.orders;
        this.getAllUserData();
        this.getTotalSales();
      },
      error: (err) => console.error(err),
    });

    this.DashboardService.getAllAdminProducts().subscribe({
      next: (res) => {
        this.allAdminProducts = res.products.length;
        this.productList = res.products;
        if (this.productList.length >= 4) {
          this.Staticsdata = [
            { name: this.productList[0].title, value: 100 },
            { name: this.productList[1].title, value: 150 },
            { name: this.productList[2].title, value: 80 },
            { name: this.productList[3].title, value: 200 },
          ];
        } else {
          this.Staticsdata = this.productList.map((item, index) => ({
            name: item.title,
            value: 100 + index * 10,
          }));
        }

        this.getAllAdminCategories();
      },
      error: (err) => console.error(err),
    });
  }

  allCustomers: {
    username: string;
    email: string;
    phone: string;
    _id: string;
  }[] = [];

  uniqueUserID: string[] = [];
  customerNumbers = 0;
  getAllUserData(): void {
    for (const order of this.usersOrders) {
      const userId = order.userId;

      if (userId !== undefined && !this.uniqueUserID.includes(userId)) {
        this.uniqueUserID.push(userId);
        this.customerNumbers++;
      }
    }
  }

  total: number = 0;
  getTotalSales() {
    for (let x of this.usersOrders[0].products) {
      if (this.adminID === x.adminId) {
        this.total += +x.price;
      }
    }
    return this.total;
  }

  uniqueAdminCategories: string[] = [];
  getAllAdminCategories(): void {
    for (const category of this.productList) {
      const categoryName = category.category.name;

      if (
        categoryName !== undefined &&
        !this.uniqueAdminCategories.includes(categoryName)
      ) {
        this.uniqueAdminCategories.push(categoryName);
      }
    }
  }

  serverURL = 'http://localhost:4000/uploads/';
}
