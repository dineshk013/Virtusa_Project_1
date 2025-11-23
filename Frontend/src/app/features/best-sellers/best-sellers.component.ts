import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LucideAngularModule, TrendingUp, Award } from 'lucide-angular';
import { LazyLoadDirective } from '../../shared/directives/lazy-load.directive';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LucideAngularModule, LazyLoadDirective],
  styleUrls: ['../../shared/directives/lazy-load.styles.scss'],
  template: `
    <div class="min-h-screen bg-background py-12">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="TrendingUp" class="h-8 w-8 text-primary"></lucide-icon>
            <h1 class="text-4xl font-bold">Best Sellers</h1>
          </div>
          <p class="text-muted-foreground">Our most popular products loved by customers</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (product of bestSellers; track product.id; let i = $index) {
            <div class="relative" appLazyLoad>
              @if (i < 3) {
                <div class="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 font-semibold text-sm">
                  <lucide-icon [img]="Award" class="h-3 w-3"></lucide-icon>
                  #{{ i + 1 }}
                </div>
              }
              <app-product-card [product]="product" />
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class BestSellersComponent implements OnInit {
  productService = inject(ProductService);
  readonly TrendingUp = TrendingUp;
  readonly Award = Award;

  bestSellers: Product[] = [];

  ngOnInit(): void {
    this.productService.getBestSellers(12).subscribe(products => {
      this.bestSellers = products;
    });
  }
}
