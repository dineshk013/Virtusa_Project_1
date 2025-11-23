import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../app/core/services/order.service';
import { Order } from '../../core/models/order.model';
import { LucideAngularModule, Package, MapPin, Clock, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-background py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Delivery Dashboard</h1>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Assigned</h3>
              <lucide-icon [img]="Package" class="h-5 w-5 text-blue-600"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ assignedOrders.length }}</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">In Transit</h3>
              <lucide-icon [img]="MapPin" class="h-5 w-5 text-orange-600"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ inTransitOrders.length }}</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Delivered Today</h3>
              <lucide-icon [img]="CheckCircle" class="h-5 w-5 text-green-600"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ deliveredToday }}</p>
          </div>

          <div class="bg-white p-6 rounded-lg border">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-sm font-medium text-muted-foreground">Pending</h3>
              <lucide-icon [img]="Clock" class="h-5 w-5 text-yellow-600"></lucide-icon>
            </div>
            <p class="text-3xl font-bold">{{ pendingOrders.length }}</p>
          </div>
        </div>

        <!-- Assigned Orders -->
        <div class="bg-white rounded-lg border p-6">
          <h2 class="text-xl font-bold mb-4">Assigned Deliveries</h2>
          <div class="space-y-4">
            @for (order of assignedOrders; track order.id) {
              <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-semibold">Order #{{ order.id }}</h3>
                    <p class="text-sm text-muted-foreground">{{ order.date }}</p>
                  </div>
                  <span
                    class="px-3 py-1 rounded-full text-sm"
                    [ngClass]="{
                      'bg-yellow-100 text-yellow-800': order.status === 'processing',
                      'bg-blue-100 text-blue-800': order.status === 'in_transit',
                      'bg-green-100 text-green-800': order.status === 'delivered'
                    }"
                  >
                    {{ order.status | titlecase }}
                  </span>
                </div>

                <div class="flex items-start gap-2 mb-3">
                  <lucide-icon [img]="MapPin" class="h-4 w-4 text-muted-foreground mt-1"></lucide-icon>
                  <p class="text-sm">{{ order.deliveryAddress }}</p>
                </div>

                <div class="flex justify-between items-center">
                  <p class="font-semibold">\₹{{ order.total.toFixed(2) }}</p>
                  <div class="flex gap-2">
                    @if (order.status === 'processing') {
                      <button
                        (click)="updateOrderStatus(order.id, 'in_transit')"
                        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Start Delivery
                      </button>
                    }
                    @if (order.status === 'in_transit') {
                      <button
                        (click)="updateOrderStatus(order.id, 'delivered')"
                        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Mark Delivered
                      </button>
                    }
                  </div>
                </div>
              </div>
            }
            @empty {
              <p class="text-center text-muted-foreground py-8">No assigned deliveries</p>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class DeliveryDashboardComponent implements OnInit {
  orderService = inject(OrderService);

  readonly Package = Package;
  readonly MapPin = MapPin;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;

  assignedOrders: Order[] = [];
  inTransitOrders: Order[] = [];
  pendingOrders: Order[] = [];
  deliveredToday = 0;

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      this.assignedOrders = orders.filter(o =>
        o.status === 'processing' || o.status === 'in_transit'
      );
      this.inTransitOrders = orders.filter(o => o.status === 'in_transit');
      this.pendingOrders = orders.filter(o => o.status === 'processing');
      this.deliveredToday = orders.filter(o =>
        o.status === 'delivered' && this.isToday(o.date)
      ).length;
    });
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(() => {
      this.loadDeliveries();
    });
  }

  private isToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
}
