import { Routes } from '@angular/router';
import { authGuard, adminGuard, deliveryGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)    ///Aman
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES) ////Jyothi
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCT_ROUTES)  /// Dinesh
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) ///Jyothi
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent)  //Jyothi
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'deals',
    loadComponent: () => import('./features/deals/deals.component').then(m => m.DealsComponent) //Akshita
  },
  {
    path: 'best-sellers',
    loadComponent: () => import('./features/best-sellers/best-sellers.component').then(m => m.BestSellersComponent)
  },
  {
    path: 'new-arrivals',
    loadComponent: () => import('./features/new-arrivals/new-arrivals.component').then(m => m.NewArrivalsComponent)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'delivery',
    canActivate: [deliveryGuard],
    loadChildren: () => import('./features/delivery-agent/delivery.routes').then(m => m.DELIVERY_ROUTES)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
