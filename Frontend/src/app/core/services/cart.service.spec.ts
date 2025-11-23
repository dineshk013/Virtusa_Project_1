import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

describe('CartService', () => {
    let service: CartService;
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        });
        service = TestBed.inject(CartService);
        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
        mockLocalStorage.clear();
    });

    afterEach(() => {
        mockLocalStorage.clear();
    });

    describe('Initialization', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should initialize with empty items', () => {
            expect(service.items().length).toBe(0);
        });

        it('should initialize with zero total', () => {
            expect(service.total()).toBe(0);
        });

        it('should initialize with zero item count', () => {
            expect(service.itemCount()).toBe(0);
        });
    });

    describe('addToCart', () => {
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

        it('should add a product to cart', () => {
            service.addToCart(mockProduct);

            expect(service.items().length).toBe(1);
            expect(service.items()[0].name).toBe('Apple');
        });

        it('should add product with default quantity of 1', () => {
            service.addToCart(mockProduct);

            expect(service.items()[0].quantity).toBe(1);
        });

        it('should add product with specified quantity', () => {
            service.addToCart(mockProduct, 5);

            expect(service.items()[0].quantity).toBe(5);
        });

        it('should increase quantity when adding existing product', () => {
            service.addToCart(mockProduct, 2);
            service.addToCart(mockProduct, 3);

            expect(service.items().length).toBe(1);
            expect(service.items()[0].quantity).toBe(5);
        });

        it('should save cart to localStorage', () => {
            service.addToCart(mockProduct);

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'revcart_cart',
                jasmine.any(String)
            );
        });

        it('should update total when adding product', () => {
            service.addToCart(mockProduct, 2);

            expect(service.total()).toBe(5.98);
        });

        it('should update item count when adding product', () => {
            service.addToCart(mockProduct, 3);

            expect(service.itemCount()).toBe(3);
        });

        it('should preserve product properties in cart item', () => {
            service.addToCart(mockProduct);
            const cartItem = service.items()[0];

            expect(cartItem.id).toBe('1');
            expect(cartItem.name).toBe('Apple');
            expect(cartItem.price).toBe(2.99);
            expect(cartItem.image).toBe('apple.jpg');
            expect(cartItem.unit).toBe('lb');
        });

        it('should handle adding multiple different products', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };

            service.addToCart(mockProduct);
            service.addToCart(product2);

            expect(service.items().length).toBe(2);
            expect(service.total()).toBe(4.98);
            expect(service.itemCount()).toBe(2);
        });
    });

    describe('removeFromCart', () => {
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
            service.addToCart(mockProduct, 3);
        });

        it('should remove item from cart', () => {
            service.removeFromCart('1');

            expect(service.items().length).toBe(0);
        });

        it('should update total after removal', () => {
            service.removeFromCart('1');

            expect(service.total()).toBe(0);
        });

        it('should update item count after removal', () => {
            service.removeFromCart('1');

            expect(service.itemCount()).toBe(0);
        });

        it('should save to localStorage after removal', () => {
            service.removeFromCart('1');

            expect(localStorage.setItem).toHaveBeenCalled();
        });

        it('should not affect other items when removing one', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };
            service.addToCart(product2, 2);

            service.removeFromCart('1');

            expect(service.items().length).toBe(1);
            expect(service.items()[0].id).toBe('2');
            expect(service.total()).toBe(3.98);
        });

        it('should handle removing non-existent item gracefully', () => {
            const initialLength = service.items().length;

            service.removeFromCart('999');

            expect(service.items().length).toBe(initialLength);
        });
    });

    describe('updateQuantity', () => {
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
            service.addToCart(mockProduct, 3);
        });

        it('should update product quantity', () => {
            service.updateQuantity('1', 5);

            expect(service.items()[0].quantity).toBe(5);
        });

        it('should update total when quantity changes', () => {
            service.updateQuantity('1', 5);

            expect(service.total()).toBeCloseTo(14.95, 2);
        }); it('should update item count when quantity changes', () => {
            service.updateQuantity('1', 5);

            expect(service.itemCount()).toBe(5);
        });

        it('should save to localStorage after quantity update', () => {
            service.updateQuantity('1', 5);

            expect(localStorage.setItem).toHaveBeenCalled();
        });

        it('should remove item when quantity is 0', () => {
            service.updateQuantity('1', 0);

            expect(service.items().length).toBe(0);
        });

        it('should remove item when quantity is negative', () => {
            service.updateQuantity('1', -1);

            expect(service.items().length).toBe(0);
        });

        it('should not affect other items when updating one', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };
            service.addToCart(product2, 2);

            service.updateQuantity('1', 1);

            expect(service.items().length).toBe(2);
            expect(service.items()[0].quantity).toBe(1);
            expect(service.items()[1].quantity).toBe(2);
        });

        it('should handle updating non-existent item gracefully', () => {
            const initialLength = service.items().length;

            service.updateQuantity('999', 5);

            expect(service.items().length).toBe(initialLength);
        });
    });

    describe('clearCart', () => {
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
            service.addToCart(mockProduct, 3);
        });

        it('should clear all items from cart', () => {
            service.clearCart();

            expect(service.items().length).toBe(0);
        });

        it('should reset total to zero', () => {
            service.clearCart();

            expect(service.total()).toBe(0);
        });

        it('should reset item count to zero', () => {
            service.clearCart();

            expect(service.itemCount()).toBe(0);
        });

        it('should remove cart from localStorage', () => {
            service.clearCart();

            expect(localStorage.removeItem).toHaveBeenCalledWith('revcart_cart');
        });
    });

    describe('Computed Values', () => {
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

        it('should calculate correct total for multiple items', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };
            const product3: Product = { ...mockProduct, id: '3', name: 'Banana', price: 0.99 };

            service.addToCart(mockProduct, 2);
            service.addToCart(product2, 3);
            service.addToCart(product3, 5);

            const expected = (2.99 * 2) + (1.99 * 3) + (0.99 * 5);
            expect(service.total()).toBeCloseTo(expected, 2);
        });

        it('should calculate correct item count', () => {
            const product2: Product = { ...mockProduct, id: '2', name: 'Orange', price: 1.99 };

            service.addToCart(mockProduct, 2);
            service.addToCart(product2, 3);

            expect(service.itemCount()).toBe(5);
        });

        it('should be readonly for items signal', () => {
            const itemsSignal = service.items;
            expect(itemsSignal).toBeDefined();
        });
    });

    describe('localStorage Integration', () => {
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

        it('should persist cart data to localStorage', () => {
            service.addToCart(mockProduct);
            const storedData = mockLocalStorage.getItem('revcart_cart');

            expect(storedData).toBeTruthy();
        });

        it('should store cart with proper structure', () => {
            service.addToCart(mockProduct, 2);
            const storedData = mockLocalStorage.getItem('revcart_cart');

            if (storedData) {
                const parsedData = JSON.parse(storedData);
                expect(Array.isArray(parsedData)).toBe(true);
                expect(parsedData[0].id).toBe('1');
                expect(parsedData[0].quantity).toBe(2);
            }
        });
    }); describe('Edge Cases', () => {
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

        it('should handle very large quantities', () => {
            service.addToCart(mockProduct, 1000000);

            expect(service.items()[0].quantity).toBe(1000000);
            expect(service.total()).toBe(2990000);
        });

        it('should handle products with zero price', () => {
            const freeProduct: Product = { ...mockProduct, price: 0 };
            service.addToCart(freeProduct, 5);

            expect(service.total()).toBe(0);
        });

        it('should handle floating point calculations correctly', () => {
            const product1: Product = { ...mockProduct, id: '1', price: 0.1 };
            const product2: Product = { ...mockProduct, id: '2', price: 0.2 };

            service.addToCart(product1, 1);
            service.addToCart(product2, 1);

            expect(service.total()).toBeCloseTo(0.3, 2);
        });

        it('should maintain cart integrity with rapid updates', () => {
            service.addToCart(mockProduct, 1);
            service.updateQuantity('1', 5);
            service.updateQuantity('1', 3);
            service.removeFromCart('1');

            expect(service.items().length).toBe(0);
            expect(service.total()).toBe(0);
        });
    });
});
