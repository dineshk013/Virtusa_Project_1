# How to Write Tests for Other Components - RevCart

This guide shows how to extend the testing framework to other services and components in RevCart using the CartService and CartComponent tests as templates.

## Table of Contents

1. [Testing a New Service](#testing-a-new-service)
2. [Testing a New Component](#testing-a-new-component)
3. [Common Patterns](#common-patterns)
4. [Example: ProductService Tests](#example-productservice-tests)
5. [Example: AuthComponent Tests](#example-authcomponent-tests)

---

## Testing a New Service

### Step 1: Create Test File

Create `src/app/core/services/your-service.spec.ts`:

```typescript
import { TestBed } from '@angular/core/testing';
import { YourService } from './your-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('YourService', () => {
  let service: YourService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YourService]
    });

    service = TestBed.inject(YourService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  describe('Feature Name', () => {
    it('should do something', () => {
      expect(service).toBeTruthy();
    });
  });
});
```

### Step 2: Organize Tests by Feature

```typescript
describe('YourService', () => {
  // ... beforeEach, afterEach ...

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Method1', () => {
    it('should handle basic case', () => {
      const result = service.method1();
      expect(result).toBeDefined();
    });

    it('should handle edge case', () => {
      // Test edge case
    });
  });

  describe('Method2', () => {
    it('should process data', () => {
      // Test implementation
    });
  });
});
```

### Step 3: Mock Dependencies

```typescript
// Mock HTTP calls
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      YourService,
      { provide: OtherService, useValue: mockOtherService }
    ]
  });
});

// Test HTTP call
it('should fetch data', () => {
  service.getData().subscribe(data => {
    expect(data).toEqual(expectedData);
  });

  const req = httpMock.expectOne('/api/data');
  expect(req.request.method).toBe('GET');
  req.flush(expectedData);
});
```

### Step 4: Test Methods

```typescript
it('should add item to list', () => {
  const initialLength = service.items.length;
  service.addItem(newItem);
  expect(service.items.length).toBe(initialLength + 1);
});

it('should throw error on invalid input', () => {
  expect(() => {
    service.processData(null);
  }).toThrowError('Invalid data');
});
```

---

## Testing a New Component

### Step 1: Create Test File

Create `src/app/features/your-feature/your-component.spec.ts`:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourComponent } from './your-component';
import { YourService } from '../../core/services/your-service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;
  let service: YourService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [YourService]
    }).compileComponents();

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(YourService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
```

### Step 2: Test Component Lifecycle

```typescript
describe('Component Lifecycle', () => {
  it('should initialize with default values', () => {
    expect(component.items).toBeDefined();
    expect(component.isLoading).toBe(false);
  });

  it('should load data on init', () => {
    spyOn(service, 'getData').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.items).toEqual(mockData);
  });

  it('should cleanup on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
```

### Step 3: Test User Interactions

```typescript
describe('User Interactions', () => {
  it('should add item when button clicked', () => {
    spyOn(service, 'addItem').and.returnValue(of(newItem));

    component.onAddClick();
    fixture.detectChanges();

    expect(service.addItem).toHaveBeenCalled();
    expect(component.items).toContain(newItem);
  });

  it('should delete item when delete button clicked', () => {
    spyOn(service, 'deleteItem').and.returnValue(of(null));

    component.onDelete(itemId);
    fixture.detectChanges();

    expect(service.deleteItem).toHaveBeenCalledWith(itemId);
  });
});
```

### Step 4: Test DOM Rendering

```typescript
describe('DOM Rendering', () => {
  beforeEach(() => {
    component.items = mockItems;
    fixture.detectChanges();
  });

  it('should display list of items', () => {
    const itemElements = fixture.nativeElement.querySelectorAll('.item');
    expect(itemElements.length).toBe(mockItems.length);
  });

  it('should display item name', () => {
    const itemName = fixture.nativeElement.querySelector('.item-name');
    expect(itemName.textContent).toContain(mockItems[0].name);
  });

  it('should show empty message when no items', () => {
    component.items = [];
    fixture.detectChanges();

    const emptyMessage = fixture.nativeElement.querySelector('.empty-message');
    expect(emptyMessage).toBeTruthy();
  });
});
```

### Step 5: Test Input/Output

```typescript
describe('Input/Output Properties', () => {
  it('should accept input data', () => {
    component.data = mockData;
    fixture.detectChanges();

    expect(component.data).toEqual(mockData);
  });

  it('should emit event when action performed', (done) => {
    component.actionEmit.subscribe((result) => {
      expect(result).toEqual(expectedResult);
      done();
    });

    component.performAction();
  });
});
```

---

## Common Patterns

### Pattern 1: Testing Service Methods

```typescript
describe('Service Method', () => {
  it('should return correct data', () => {
    const input = { id: 1, name: 'Test' };
    const result = service.processData(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle error', () => {
    expect(() => {
      service.processData(null);
    }).toThrowError();
  });

  it('should return Observable', (done) => {
    service.fetchData().subscribe(data => {
      expect(data).toBeDefined();
      done();
    });
  });
});
```

### Pattern 2: Testing Component Events

```typescript
describe('Component Events', () => {
  it('should call handler on event', () => {
    spyOn(component, 'onEvent');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.onEvent).toHaveBeenCalled();
  });

  it('should pass event data', () => {
    const handler = jasmine.createSpy('handler');
    component.dataEmit.subscribe(handler);

    component.emitData(testData);

    expect(handler).toHaveBeenCalledWith(testData);
  });
});
```

### Pattern 3: Testing Forms

```typescript
describe('Form Handling', () => {
  it('should validate form', () => {
    component.form.patchValue({
      name: '',
      email: 'invalid'
    });

    expect(component.form.valid).toBe(false);
  });

  it('should submit valid form', () => {
    spyOn(service, 'submit').and.returnValue(of({}));

    component.form.patchValue(validData);
    component.onSubmit();

    expect(service.submit).toHaveBeenCalledWith(validData);
  });
});
```

### Pattern 4: Testing Signals (Angular 18)

```typescript
describe('Signal-based State', () => {
  it('should update computed value', () => {
    component.itemsSignal.set([item1, item2]);
    expect(component.itemCount()).toBe(2);
  });

  it('should reflect changes in template', () => {
    component.itemsSignal.set([]);
    fixture.detectChanges();

    const message = fixture.nativeElement.textContent;
    expect(message).toContain('No items');
  });
});
```

---

## Example: ProductService Tests

### Template

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getProducts', () => {
    it('should fetch all products', () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Product 1',
          price: 10.99,
          category: 'Category 1',
          categoryId: 'cat-1',
          image: 'image1.jpg',
          unit: 'piece',
          description: 'Description 1',
          inStock: true,
          rating: 4.5,
          reviews: 100
        }
      ];

      service.getProducts().subscribe(products => {
        expect(products.length).toBe(1);
        expect(products[0].name).toBe('Product 1');
      });

      const req = httpMock.expectOne(`${apiUrl}/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });

    it('should handle error', () => {
      service.getProducts().subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne(`${apiUrl}/products`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id', () => {
      const mockProduct: Product = {
        id: '1',
        name: 'Product 1',
        price: 10.99,
        category: 'Category 1',
        categoryId: 'cat-1',
        image: 'image1.jpg',
        unit: 'piece',
        description: 'Description 1',
        inStock: true,
        rating: 4.5,
        reviews: 100
      };

      service.getProductById('1').subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne(`${apiUrl}/products/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });
  });

  describe('searchProducts', () => {
    it('should search products by query', () => {
      const query = 'apple';
      const mockProducts: Product[] = [];

      service.searchProducts(query).subscribe(products => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(`${apiUrl}/products/search?q=${query}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });
  });

  describe('getProductsByCategory', () => {
    it('should fetch products by category', () => {
      const categoryId = 'cat-1';
      const mockProducts: Product[] = [];

      service.getProductsByCategory(categoryId).subscribe(products => {
        expect(products).toBeDefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/products/category/${categoryId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });
  });
});
```

---

## Example: AuthComponent Tests

### Template

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { User } from '../../core/models/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'customer'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with empty fields', () => {
      expect(component.form.get('email')?.value).toBe('');
      expect(component.form.get('password')?.value).toBe('');
    });

    it('should have invalid form initially', () => {
      expect(component.form.valid).toBe(false);
    });
  });

  describe('Form Validation', () => {
    it('should validate email format', () => {
      const emailControl = component.form.get('email');

      emailControl?.setValue('invalid');
      expect(emailControl?.hasError('email')).toBe(true);

      emailControl?.setValue('valid@example.com');
      expect(emailControl?.hasError('email')).toBe(false);
    });

    it('should require password', () => {
      const passwordControl = component.form.get('password');

      passwordControl?.setValue('');
      expect(passwordControl?.hasError('required')).toBe(true);

      passwordControl?.setValue('password');
      expect(passwordControl?.hasError('required')).toBe(false);
    });

    it('should be valid with correct input', () => {
      component.form.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(component.form.valid).toBe(true);
    });
  });

  describe('Login Submission', () => {
    beforeEach(() => {
      component.form.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should call authService.login on submit', () => {
      spyOn(authService, 'login').and.returnValue(of(mockUser));

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should navigate to home on successful login', () => {
      spyOn(authService, 'login').and.returnValue(of(mockUser));
      spyOn(component['router'], 'navigate');

      component.onSubmit();

      expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    });

    it('should show error message on failed login', () => {
      const errorMessage = 'Invalid credentials';
      spyOn(authService, 'login').and.returnValue(throwError(() => new Error(errorMessage)));

      component.onSubmit();
      fixture.detectChanges();

      expect(component.error).toContain(errorMessage);
    });

    it('should set loading state during login', () => {
      spyOn(authService, 'login').and.returnValue(of(mockUser));

      expect(component.isLoading).toBe(false);

      component.onSubmit();
      fixture.detectChanges();

      expect(component.isLoading).toBe(false); // After completion
    });
  });

  describe('UI Rendering', () => {
    it('should display email input', () => {
      const input = fixture.nativeElement.querySelector('input[type="email"]');
      expect(input).toBeTruthy();
    });

    it('should display password input', () => {
      const input = fixture.nativeElement.querySelector('input[type="password"]');
      expect(input).toBeTruthy();
    });

    it('should disable submit button when form invalid', () => {
      const button = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(true);
    });

    it('should enable submit button when form valid', () => {
      component.form.patchValue({
        email: 'test@example.com',
        password: 'password123'
      });
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBe(false);
    });

    it('should display error message', () => {
      component.error = 'Login failed';
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector('.error');
      expect(errorElement.textContent).toContain('Login failed');
    });
  });
});
```

---

## Checklist for Writing Tests

- [ ] Create test file with `.spec.ts` extension
- [ ] Import necessary testing utilities
- [ ] Setup TestBed in beforeEach
- [ ] Initialize component/service
- [ ] Write initialization tests
- [ ] Test main functionality
- [ ] Test edge cases
- [ ] Test error handling
- [ ] Test UI rendering (for components)
- [ ] Test user interactions (for components)
- [ ] Mock external dependencies
- [ ] Use descriptive test names
- [ ] Follow AAA pattern (Arrange-Act-Assert)
- [ ] Cleanup in afterEach
- [ ] Run tests to verify

---

## Running Your New Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- --include='**/your-service.spec.ts'

# Run with coverage
npm test -- --code-coverage

# Run in watch mode
npm test -- --watch=true

# Run headless (CI/CD)
npm test -- --watch=false --browsers=ChromeHeadless
```

---

## Summary

Use these patterns to:
1. ✅ Create consistent test files for all services
2. ✅ Test components with user interactions
3. ✅ Mock dependencies properly
4. ✅ Follow best practices
5. ✅ Ensure quality and maintainability

The CartService and CartComponent tests are excellent references for implementing tests for other parts of the application!
