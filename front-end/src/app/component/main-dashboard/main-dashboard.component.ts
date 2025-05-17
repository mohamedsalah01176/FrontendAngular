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
      value: 65,
    },
  ];
  colorScheme = 'vivid';

  Staticsdata = [
    { name: 'Product 1', value: 100 },
    { name: 'Product 2', value: 150 },
    { name: 'Product 3', value: 80 },
    { name: 'Product 4', value: 200 },
  ];

  usersOrders = [
    {
      _id: '',
      products: [{ title: '', adminId: '' }],
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
      },
      error: (err) => console.error(err),
    });

    this.DashboardService.getAllAdminProducts().subscribe({
      next: (res) => {
        this.allAdminProducts = res.products.length;
        this.productList = res.products;
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

  getTotalSales() {
    let total: number = 0;
    for (let x of this.usersOrders) {
      total += +x.total;
    }
    return total;
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
    console.log(this.uniqueAdminCategories);
  }


   serverURL = 'http://localhost:4000/uploads/'
}
