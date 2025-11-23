import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/models/product.model';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LucideAngularModule, Truck, Clock, Shield } from 'lucide-angular';
import { LazyLoadDirective } from '../../shared/directives/lazy-load.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, LucideAngularModule, LazyLoadDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../shared/directives/lazy-load.styles.scss']
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);

  featuredProducts: Product[] = [];
  categories: Category[] = [];

  // Icons
  readonly Truck = Truck;
  readonly Clock = Clock;
  readonly Shield = Shield;

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.featuredProducts = products.slice(0, 8);
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
