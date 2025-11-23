import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LucideAngularModule, TrendingUp, Sparkles } from 'lucide-angular';
import { LazyLoadDirective } from '../../shared/directives/lazy-load.directive';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LucideAngularModule, LazyLoadDirective],
  styleUrls: ['../../shared/directives/lazy-load.styles.scss'],
  template: `
    <div class="min-h-screen bg-background py-12">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="TrendingUp" class="h-8 w-8 text-primary"></lucide-icon>
            <h1 class="text-4xl font-bold">New Arrivals</h1>
          </div>
          <p class="text-muted-foreground">Discover our latest fresh products</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (product of newProducts; track product.id) {
            <div class="relative" appLazyLoad>
              <div class="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 font-semibold text-sm">
                <lucide-icon [img]="Sparkles" class="h-3 w-3"></lucide-icon>
                NEW
              </div>
              <app-product-card [product]="product" />
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class NewArrivalsComponent implements OnInit {
  productService = inject(ProductService);
  readonly TrendingUp = TrendingUp;
  readonly Sparkles = Sparkles;

  newProducts: Product[] = [];

  ngOnInit(): void {
    this.productService.getNewArrivals(12).subscribe(products => {
      this.newProducts = products;
    });
  }
}
