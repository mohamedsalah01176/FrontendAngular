import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProfileComponent } from './component/profile/profile.component';
import { OrdersComponent } from './component/orders/orders.component';
import { DaishboardComponent } from './component/daishboard/daishboard.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { OrdersDashboardComponent } from './component/orders-dashboard/orders-dashboard.component';
import { ProductsDashboardComponent } from './component/products-dashboard/products-dashboard.component';
import { CustomersDashboardComponent } from './component/customers-dashboard/customers-dashboard.component';
import { MainDashboardComponent } from './component/main-dashboard/main-dashboard.component';
import { WishListComponent } from './component/wish-list/wish-list.component';
import { ErrorComponent } from './component/error/error.component';

import { CheckoutComponent } from './component/checkout/checkout.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { SettingsComponent } from './component/settings/settings.component';
// import { authGuard } from './util/Guards/auth.guard';
// import { loggedGuard } from './util/Guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    // canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products Page',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products Page',
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        title: 'Product Page',
      },
      { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
      { path: 'order', component: OrdersComponent, title: 'Profile Page' },
      {
        path: 'daishboard',
        component: DaishboardComponent,
        title: 'Daishboard Page',
        children: [
          { path: '', redirectTo: 'mainDashboard', pathMatch: 'full' },
          {
            path: 'mainDashboard',
            component: MainDashboardComponent,
            title: 'Dashboard Page',
          },
          {
            path: 'orders',
            component: OrdersDashboardComponent,
            title: 'orders Page',
          },
          {
            path: 'products',
            component: ProductsDashboardComponent,
            title: 'Productsz Page',
          },
          {
            path: 'customers',
            component: CustomersDashboardComponent,
            title: 'Customers Page',
          },
        ],
      },
      { path: 'cart', component: CartComponent, title: 'Cart Page' },
      { path: 'wishlist', component: WishListComponent, title: 'Wishlist' },

      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Category Page',
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout Page',
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'About Page',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings Page',
      },
    ],
  },
  { path: '**', component: ErrorComponent, title: 'Error Page' },
];
