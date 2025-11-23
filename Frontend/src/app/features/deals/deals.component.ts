import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LucideAngularModule, Tag } from 'lucide-angular';
import { LazyLoadDirective } from '../../shared/directives/lazy-load.directive';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LucideAngularModule, LazyLoadDirective],
  styleUrls: ['../../shared/directives/lazy-load.styles.scss'],
  template: `
    <div class="min-h-screen bg-background py-12">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <lucide-icon [img]="Tag" class="h-8 w-8 text-primary"></lucide-icon>
            <h1 class="text-4xl font-bold">Deals & Offers</h1>
          </div>
          <p class="text-muted-foreground">Save big on your favorite products</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (product of dealProducts; track product.id) {
            <div class="relative" appLazyLoad>
              <div class="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground px-2 py-1 rounded-md font-semibold text-sm">
                {{ product.discount }}% OFF
              </div>
              <app-product-card [product]="product" [showDiscount]="true" />
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DealsComponent implements OnInit {
  productService = inject(ProductService);
  readonly Tag = Tag;

  dealProducts: (Product & { discount?: number })[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.dealProducts = products.map((product, index) => ({
        ...product,
        originalPrice: product.price * 1.3,
        discount: index % 2 === 0 ? 20 : 30
      })).slice(0, 12);
    });
  }
}
