import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { Order } from '../../../core/models/order.model';
import { LucideAngularModule, Package, Users, DollarSign, TrendingUp } from 'lucide-angular';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    template: `
    <div class="min-h-screen bg-background py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Total Orders</h3>
              <lucide-icon [img]="Package" class="h-5 w-5 text-primary"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ stats.totalOrders }}</p>
            <p class="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Total Revenue</h3>
              <lucide-icon [img]="DollarSign" class="h-5 w-5 text-primary"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">\₹{{ stats.totalRevenue.toFixed(2) }}</p>
            <p class="text-xs text-green-600 mt-1">+18% from last month</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Total Products</h3>
              <lucide-icon [img]="Package" class="h-5 w-5 text-primary"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ stats.totalProducts }}</p>
            <p class="text-xs text-blue-600 mt-1">{{ stats.inStock }} in stock</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Active Users</h3>
              <lucide-icon [img]="Users" class="h-5 w-5 text-primary"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ stats.activeUsers }}</p>
            <p class="text-xs text-green-600 mt-1">+5% from last month</p>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            routerLink="/admin/products"
            class="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow text-left"
          >
            <h3 class="font-semibold mb-2">Manage Products</h3>
            <p class="text-sm text-muted-foreground">Add, edit, or remove products</p>
          </button>

          <button
            routerLink="/admin/orders"
            class="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow text-left"
          >
            <h3 class="font-semibold mb-2">Manage Orders</h3>
            <p class="text-sm text-muted-foreground">View and update order status</p>
          </button>

          <button
            routerLink="/admin/users"
            class="p-6 bg-white border rounded-lg hover:shadow-md transition-shadow text-left"
          >
            <h3 class="font-semibold mb-2">Manage Users</h3>
            <p class="text-sm text-muted-foreground">View and manage user accounts</p>
          </button>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white rounded-lg border p-6">
          <h2 class="text-xl font-bold mb-4">Recent Orders</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-4">Order ID</th>
                  <th class="text-left py-3 px-4">Date</th>
                  <th class="text-left py-3 px-4">Status</th>
                  <th class="text-left py-3 px-4">Total</th>
                  <th class="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (order of recentOrders; track order.id) {
                  <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-4 font-medium">{{ order.id }}</td>
                    <td class="py-3 px-4">{{ order.date }}</td>
                    <td class="py-3 px-4">
                      <span
                        class="px-2 py-1 rounded-full text-xs"
                        [ngClass]="{
                          'bg-yellow-100 text-yellow-800': order.status === 'processing',
                          'bg-blue-100 text-blue-800': order.status === 'in_transit',
                          'bg-green-100 text-green-800': order.status === 'delivered',
                          'bg-red-100 text-red-800': order.status === 'cancelled'
                        }"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="py-3 px-4">\₹{{ order.total.toFixed(2) }}</td>
                    <td class="py-3 px-4">
                      <button
                        [routerLink]="['/admin/orders', order.id]"
                        class="text-primary hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
    orderService = inject(OrderService);
    productService = inject(ProductService);

    readonly Package = Package;
    readonly Users = Users;
    readonly DollarSign = DollarSign;
    readonly TrendingUp = TrendingUp;

    stats = {
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        inStock: 0,
        activeUsers: 1234
    };

    recentOrders: Order[] = [];

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.orderService.getAllOrders().subscribe(orders => {
            this.recentOrders = orders.slice(0, 10);
            this.stats.totalOrders = orders.length;
            this.stats.totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        });

        this.productService.getProducts().subscribe(products => {
            this.stats.totalProducts = products.length;
            this.stats.inStock = products.filter(p => p.inStock).length;
        });
    }
}
