import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../core/services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PLATFORM_ID } from '@angular/core';
import { Product } from '../../core/models/product.model';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let cartService: CartService;
    let store: { [key: string]: string } = {};

    // Mock localStorage
    const mockLocalStorage = {
        getItem: (key: string): string | null => {
            return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CartComponent, RouterTestingModule],
            providers: [
                CartService,
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        }).compileComponents();

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
        mockLocalStorage.clear();

        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        cartService = TestBed.inject(CartService);
        fixture.detectChanges();
    });

    afterEach(() => {
        mockLocalStorage.clear();
    });

    describe('Component Initialization', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should inject CartService', () => {
            expect(component.cartService).toBeTruthy();
        });

        it('should have icon properties defined', () => {
            expect(component.ShoppingBag).toBeDefined();
            expect(component.Trash2).toBeDefined();
            expect(component.Plus).toBeDefined();
            expect(component.Minus).toBeDefined();
        });

        it('should display empty cart message when cart is empty', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const emptyMessage = compiled.querySelector('h2');

            expect(emptyMessage).toBeTruthy();
            expect(emptyMessage.textContent).toContain('Your cart is empty');
        });

        it('should show Start Shopping button when cart is empty', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const button = compiled.querySelector('a');

            expect(button).toBeTruthy();
            expect(button.getAttribute('routerLink')).toBe('/products');
            expect(button.textContent).toContain('Start Shopping');
        });
    });

    describe('Cart with Items', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 2);
            fixture.detectChanges();
        });

        it('should display cart items', () => {
            const compiled = fixture.nativeElement;
            const cartItems = compiled.querySelectorAll('[class*="flex gap-4"]');

            expect(cartItems.length).toBeGreaterThan(0);
        });

        it('should display product name', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const productName = compiled.textContent;

            expect(productName).toContain('Apple');
        });

        it('should display product price', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const priceText = compiled.textContent;

            expect(priceText).toContain('₹2.99');
        });

        it('should display product image', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const images = compiled.querySelectorAll('img');

            expect(images.length).toBeGreaterThan(0);
            expect(images[0].src).toContain('apple.jpg');
        });

        it('should display product unit', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const unitText = compiled.textContent;

            expect(unitText).toContain('lb');
        });
    });

    describe('deliveryFee Getter', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };
        });

        it('should return 0 delivery fee for empty cart', () => {
            expect(component.deliveryFee).toBe(0);
        });

        it('should return 5.99 delivery fee for non-empty cart', () => {
            cartService.addToCart(mockProduct);

            expect(component.deliveryFee).toBe(5.99);
        });

        it('should return delivery fee based on total', () => {
            cartService.addToCart(mockProduct, 3);

            // Total > 0, so delivery fee should be 5.99
            expect(component.deliveryFee).toBe(5.99);
        });
    });

    describe('grandTotal Getter', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };
        });

        it('should return 0 for empty cart', () => {
            expect(component.grandTotal).toBe(0);
        });

        it('should include delivery fee in grand total', () => {
            cartService.addToCart(mockProduct, 2);
            const expectedTotal = 5.98 + 5.99; // (2.99 * 2) + delivery fee

            expect(component.grandTotal).toBe(expectedTotal);
        });

        it('should calculate correct grand total with multiple items', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };

            cartService.addToCart(mockProduct, 2);
            cartService.addToCart(product2, 1);

            const subtotal = (2.99 * 2) + 1.99;
            const expectedTotal = subtotal + 5.99;

            expect(component.grandTotal).toBeCloseTo(expectedTotal, 2);
        });

        it('should return 0 when cart total is 0', () => {
            // Empty cart scenario
            expect(component.grandTotal).toBe(0);
        });
    });

    describe('increaseQuantity', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 2);
        });

        it('should increase product quantity', () => {
            component.increaseQuantity('1', 2);

            expect(cartService.items()[0].quantity).toBe(3);
        });

        it('should increase from 1 to 2', () => {
            cartService.clearCart();
            cartService.addToCart(mockProduct, 1);

            component.increaseQuantity('1', 1);

            expect(cartService.items()[0].quantity).toBe(2);
        });

        it('should increase large quantities', () => {
            component.increaseQuantity('1', 100);

            expect(cartService.items()[0].quantity).toBe(101);
        });

        it('should call updateQuantity with correct parameters', () => {
            spyOn(cartService, 'updateQuantity');

            component.increaseQuantity('1', 2);

            expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 3);
        });
    });

    describe('decreaseQuantity', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 5);
        });

        it('should decrease product quantity', () => {
            component.decreaseQuantity('1', 5);

            expect(cartService.items()[0].quantity).toBe(4);
        });

        it('should decrease to 1 but not below', () => {
            component.decreaseQuantity('1', 2);

            expect(cartService.items()[0].quantity).toBe(1);
        });

        it('should not decrease below 1', () => {
            cartService.clearCart();
            cartService.addToCart(mockProduct, 1);

            component.decreaseQuantity('1', 1);

            // Should not call updateQuantity when current quantity is 1
            expect(cartService.items()[0].quantity).toBe(1);
        }); it('should call updateQuantity only when quantity > 1', () => {
            spyOn(cartService, 'updateQuantity');

            component.decreaseQuantity('1', 5);

            expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 4);
        });

        it('should not call updateQuantity when quantity is 1', () => {
            spyOn(cartService, 'updateQuantity');
            cartService.clearCart();
            cartService.addToCart(mockProduct, 1);

            component.decreaseQuantity('1', 1);

            expect(cartService.updateQuantity).not.toHaveBeenCalled();
        });

        it('should handle decreasing from large quantities', () => {
            spyOn(cartService, 'updateQuantity');

            component.decreaseQuantity('1', 100);

            expect(cartService.updateQuantity).toHaveBeenCalledWith('1', 99);
        });
    });

    describe('removeItem', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 3);
        });

        it('should remove item from cart', () => {
            component.removeItem('1');

            expect(cartService.items().length).toBe(0);
        });

        it('should call removeFromCart with correct product id', () => {
            spyOn(cartService, 'removeFromCart');

            component.removeItem('1');

            expect(cartService.removeFromCart).toHaveBeenCalledWith('1');
        });

        it('should not affect other items', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange' };

            cartService.addToCart(product2);
            component.removeItem('1');

            expect(cartService.items().length).toBe(1);
            expect(cartService.items()[0].id).toBe('2');
        });
    });

    describe('UI Rendering with Cart Data', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 2);
            fixture.detectChanges();
        });

        it('should display quantity controls', () => {
            const compiled = fixture.nativeElement;
            const buttons = compiled.querySelectorAll('button');

            // Should have increase, decrease, and remove buttons
            expect(buttons.length).toBeGreaterThan(2);
        });

        it('should display remove button with Trash2 icon', () => {
            const compiled = fixture.nativeElement;
            const removeButton = compiled.querySelector('button');

            expect(removeButton).toBeTruthy();
        });

        it('should have functioning checkout button', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const links = compiled.querySelectorAll('a');

            // Should have a checkout link
            const checkoutLink = Array.from(links).find((link: any) =>
                link.getAttribute('routerLink') === '/checkout'
            );

            expect(checkoutLink).toBeTruthy();
        });
    });

    describe('Summary Section', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };

            cartService.addToCart(mockProduct, 2);
            fixture.detectChanges();
        });

        it('should display subtotal', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const text = compiled.textContent;

            expect(text).toContain('Subtotal');
        });

        it('should display delivery fee', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const text = compiled.textContent;

            expect(text).toContain('Delivery');
        });

        it('should display grand total', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const text = compiled.textContent;

            expect(text).toContain('Total');
        });

        it('should display subtotal amount', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const text = compiled.textContent;

            expect(text).toContain('₹5.98'); // 2.99 * 2
        });

        it('should display delivery fee amount', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            const text = compiled.textContent;

            expect(text).toContain('₹5.99');
        });
    });

    describe('Edge Cases and User Interactions', () => {
        let mockProduct: Product;

        beforeEach(() => {
            mockProduct = {
                id: '1',
                name: 'Apple',
                price: 2.99,
                category: 'Fruits',
                categoryId: 'cat-1',
                image: 'apple.jpg',
                unit: 'lb',
                description: 'Fresh red apples',
                inStock: true,
                rating: 4.5,
                reviews: 100
            };
        });

        it('should handle adding and removing items sequentially', () => {
            cartService.addToCart(mockProduct);
            fixture.detectChanges();

            component.removeItem('1');
            fixture.detectChanges();

            expect(cartService.items().length).toBe(0);
        });

        it('should handle multiple quantity increases', () => {
            cartService.addToCart(mockProduct, 1);

            component.increaseQuantity('1', 1);
            component.increaseQuantity('1', 2);
            component.increaseQuantity('1', 3);

            expect(cartService.items()[0].quantity).toBe(4);
        });

        it('should correctly calculate totals after series of operations', () => {
            cartService.addToCart(mockProduct, 1);
            component.increaseQuantity('1', 1);
            component.increaseQuantity('1', 2);

            const expectedSubtotal = 2.99 * 3;
            const expectedTotal = expectedSubtotal + 5.99;

            expect(component.grandTotal).toBeCloseTo(expectedTotal, 2);
        });

        it('should display empty state after removing all items', () => {
            cartService.addToCart(mockProduct);
            fixture.detectChanges();

            component.removeItem('1');
            fixture.detectChanges();

            const compiled = fixture.nativeElement;
            const emptyMessage = compiled.querySelector('h2');

            expect(emptyMessage).toBeTruthy();
            expect(emptyMessage.textContent).toContain('Your cart is empty');
        });
    });
});
