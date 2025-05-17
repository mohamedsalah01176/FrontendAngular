import { DashboardService } from './../../util/services/dashboard.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../util/interfaces/iproduct';

@Component({
  selector: 'app-customers-dashboard',
  imports: [],
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.css',
})
export class CustomersDashboardComponent {
  usersOrders = [
    {
      _id: '',
      products: [{ title: '', adminId: '' }],
      total: '',
      createdAt: '',
      userId: '',
    },
  ];

  constructor(
    private DashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  adminID = '';

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
  }

  allCustomers: {
    username: string;
    email: string;
    phone: string;
    _id: string;
  }[] = [];

  uniqueUserID: string[] = [];
  isAlreadyAdded = false;
  getAllUserData(): void {
    for (const order of this.usersOrders) {
      const userId = order.userId;

      if (userId !== undefined && !this.uniqueUserID.includes(userId)) {
        this.uniqueUserID.push(userId);
        this.isAlreadyAdded = false;
      } else {
        this.isAlreadyAdded = true;
      }

      if (userId && !this.isAlreadyAdded) {
        this.DashboardService.getUserById(userId).subscribe({
          next: (res) => {
            const user = res.data?.[0];
            if (user) {
              this.allCustomers.push(user);
            }
          },
          error: (err) => console.error('Error fetching user:', err),
        });
      }
    }
  }
}
