import { Product, Category } from '../../app/core/models/product.model';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Vegetables',
    icon: '🥬',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400'
  },
  {
    id: '2',
    name: 'Fruits',
    icon: '🍎',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400'
  },
  {
    id: '3',
    name: 'Dairy',
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400'
  },
  {
    id: '4',
    name: 'Bakery',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
  },
  {
    id: '5',
    name: 'Meat',
    icon: '🥩',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400'
  },
  {
    id: '6',
    name: 'Beverages',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', price: 239.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=60', unit: 'per lb', description: 'Fresh, juicy tomatoes perfect for salads and cooking', inStock: true, rating: 4.5, reviews: 128 },

  { id: '2', name: 'Organic Bananas', price: 159.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', unit: 'per bunch', description: 'Ripe organic bananas, naturally sweet', inStock: true, rating: 4.8, reviews: 256 },

  { id: '3', name: 'Fresh Milk', price: 279.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', unit: 'per gallon', description: 'Farm-fresh whole milk', inStock: true, rating: 4.7, reviews: 189 },

  { id: '4', name: 'Whole Wheat Bread', price: 199.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', unit: 'per loaf', description: 'Freshly baked whole wheat bread', inStock: true, rating: 4.6, reviews: 145 },

  { id: '5', name: 'Chicken Breast', price: 719.2, category: 'Meat', categoryId: '5', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', unit: 'per lb', description: 'Fresh, skinless chicken breast', inStock: true, rating: 4.4, reviews: 98 },

  { id: '6', name: 'Crisp Lettuce', price: 143.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1657411658285-2742c4c5ed1d?w=600', unit: 'each', description: 'Crisp iceberg lettuce for sandwiches and salads', inStock: true, rating: 4.2, reviews: 67 },

  { id: '7', name: 'Red Bell Peppers', price: 263.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1608737637507-9aaeb9f4bf30?w=600', unit: 'per lb', description: 'Sweet red bell peppers, crunchy and colorful', inStock: true, rating: 4.6, reviews: 102 },

  { id: '8', name: 'Baby Spinach', price: 239.2, category: 'Vegetables', categoryId: '1', image: 'https://plus.unsplash.com/premium_photo-1701699257548-8261a687236f?w=600', unit: 'per bag', description: 'Tender baby spinach leaves, washed and ready', inStock: false, rating: 4.7, reviews: 140 },

  { id: '9', name: 'Russet Potatoes', price: 79.2, category: 'Vegetables', categoryId: '1', image: 'https://plus.unsplash.com/premium_photo-1723600901806-8a98c9ebc094?w=600', unit: 'per lb', description: 'Starchy russet potatoes, great for baking and mashing', inStock: true, rating: 4.3, reviews: 81 },

  { id: '10', name: 'Carrots (Organic)', price: 199.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600', unit: 'per bunch', description: 'Sweet organic carrots, perfect for snacking', inStock: true, rating: 4.5, reviews: 94 },

  { id: '11', name: 'Green Apples', price: 183.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1577028300036-aa112c18d109?w=600', unit: 'per lb', description: 'Crisp and tart green apples, ideal for pies', inStock: true, rating: 4.4, reviews: 130 },

  { id: '12', name: 'Strawberries (Pint)', price: 319.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1582472138480-e84227671cd4?w=600', unit: 'per pint', description: 'Sweet and juicy strawberries, locally sourced', inStock: true, rating: 4.9, reviews: 312 },

  { id: '13', name: 'Blueberries (Pint)', price: 359.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', unit: 'per pint', description: 'Fresh blueberries, great for smoothies', inStock: false, rating: 4.6, reviews: 210 },

  { id: '14', name: 'Seedless Grapes', price: 287.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1574871866887-911cff04aef1?w=600', unit: 'per lb', description: 'Sweet seedless grapes, snack-ready', inStock: true, rating: 4.5, reviews: 176 },

  { id: '15', name: 'Mango (Ripe)', price: 119.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?w=600', unit: 'each', description: 'Juicy ripe mangoes, fragrant and sweet', inStock: true, rating: 4.8, reviews: 220 },

  { id: '16', name: 'Greek Yogurt (Plain)', price: 479.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600', unit: '32 oz', description: 'Thick plain Greek yogurt, high in protein', inStock: true, rating: 4.7, reviews: 164 },

  { id: '17', name: 'Cheddar Cheese Block', price: 519.2, category: 'Dairy', categoryId: '3', image: 'https://plus.unsplash.com/premium_photo-1760605911334-090ac301cc15?w=600', unit: 'per pack', description: 'Aged cheddar cheese, sharp and flavorful', inStock: true, rating: 4.6, reviews: 143 },

  { id: '18', name: 'Butter (Salted)', price: 319.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', unit: 'per stick', description: 'Creamy salted butter for baking and cooking', inStock: true, rating: 4.5, reviews: 95 },

  { id: '19', name: 'Eggs (Dozen)', price: 239.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400', unit: 'per dozen', description: 'Free-range eggs, medium size', inStock: true, rating: 4.6, reviews: 212 },

  { id: '20', name: 'Cottage Cheese', price: 359.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1661349008073-136bed6e6788?w=600', unit: '16 oz', description: 'Light and creamy cottage cheese', inStock: true, rating: 4.3, reviews: 72 },

  { id: '21', name: 'Sourdough Loaf', price: 319.2, category: 'Bakery', categoryId: '4', image: 'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?w=600', unit: 'per loaf', description: 'Artisan sourdough with a crisp crust', inStock: true, rating: 4.8, reviews: 198 },

  { id: '22', name: 'Croissants (Pack of 4)', price: 439.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400', unit: 'pack', description: 'Buttery, flaky croissants baked fresh daily', inStock: true, rating: 4.7, reviews: 157 },

  { id: '23', name: 'Bagels (6-pack)', price: 399.2, category: 'Bakery', categoryId: '4', image: 'https://plus.unsplash.com/premium_photo-1720070416636-0e5ef67d3862?w=600', unit: 'pack', description: 'Chewy bagels, assorted flavors', inStock: true, rating: 4.5, reviews: 120 },

  { id: '24', name: 'Chocolate Muffins (2)', price: 239.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1586111893496-8f91022df73a?w=600', unit: 'pack', description: 'Rich chocolate muffins with chocolate chips', inStock: true, rating: 4.6, reviews: 88 },

  { id: '25', name: 'Banana Bread Loaf', price: 343.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1642068151095-e44d35b7ad8a?w=600', unit: 'per loaf', description: 'Moist banana bread packed with banana flavor', inStock: true, rating: 4.7, reviews: 132 },

  { id: '26', name: 'Ground Beef (80/20)', price: 639.2, category: 'Meat', categoryId: '5', image: 'https://plus.unsplash.com/premium_photo-1668616816953-a02cd1a44027?w=600', unit: 'per lb', description: 'Fresh ground beef, ideal for burgers', inStock: true, rating: 4.4, reviews: 110 },

  { id: '27', name: 'Pork Chops', price: 559.2, category: 'Meat', categoryId: '5', image: 'https://plus.unsplash.com/premium_photo-1722686483348-2324b28215d2?w=600', unit: 'per lb', description: 'Boneless pork chops, tender cut', inStock: true, rating: 4.3, reviews: 79 },

  { id: '28', name: 'Salmon Fillet', price: 1039.2, category: 'Meat', categoryId: '5', image: 'https://plus.unsplash.com/premium_photo-1726768907990-d3cbc8efdee5?w=600', unit: 'per lb', description: 'Fresh wild-caught salmon fillet', inStock: true, rating: 4.8, reviews: 221 },

  { id: '29', name: 'Bacon (Smoked)', price: 479.2, category: 'Meat', categoryId: '5', image: 'https://images.unsplash.com/photo-1694983361629-0363ab0d1b49?w=600', unit: 'per pack', description: 'Smoked bacon, thick cut', inStock: true, rating: 4.6, reviews: 160 },

  { id: '30', name: 'Turkey Slices (Deli)', price: 399.2, category: 'Meat', categoryId: '5', image: 'https://plus.unsplash.com/premium_photo-1664392048940-3e08720a4207?w=600', unit: 'per pack', description: 'Thin-sliced deli turkey, low sodium', inStock: false, rating: 4.2, reviews: 52 },

  { id: '31', name: 'Orange Juice (Fresh)', price: 319.2, category: 'Beverages', categoryId: '6', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', unit: 'per bottle', description: 'Fresh squeezed orange juice, no added sugar', inStock: true, rating: 4.6, reviews: 145 },

  { id: '32', name: 'Sparkling Water (6-pack)', price: 359.2, category: 'Beverages', categoryId: '6', image: 'https://plus.unsplash.com/premium_photo-1687354256687-b5ee47c043c1?w=600', unit: 'pack', description: 'Natural sparkling water, crisp and refreshing', inStock: true, rating: 4.4, reviews: 98 },

  { id: '33', name: 'Cold Brew Coffee (12 oz)', price: 279.2, category: 'Beverages', categoryId: '6', image: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=600', unit: 'can', description: 'Smooth cold brew coffee, ready to drink', inStock: true, rating: 4.5, reviews: 173 },

  { id: '34', name: 'Herbal Tea Assortment', price: 479.2, category: 'Beverages', categoryId: '6', image: 'https://plus.unsplash.com/premium_photo-1731696604013-52ccf4c49bd9?w=600', unit: 'box', description: 'Assorted herbal tea bags for relaxation', inStock: true, rating: 4.6, reviews: 88 },

  { id: '35', name: 'Almond Milk (Unsweetened)', price: 279.2, category: 'Beverages', categoryId: '6', image: 'https://images.unsplash.com/photo-1601436423474-51738541c1b1?w=600', unit: 'per carton', description: 'Unsweetened almond milk, dairy-free', inStock: true, rating: 4.4, reviews: 132 },

  { id: '36', name: 'Mixed Salad Pack', price: 343.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', unit: 'per pack', description: 'Pre-mixed salad greens with arugula and spinach', inStock: false, rating: 4.5, reviews: 77 },

  { id: '37', name: 'Pineapple (Whole)', price: 239.2, category: 'Fruits', categoryId: '2', image: 'https://plus.unsplash.com/premium_photo-1724255994628-dceb76a829e8?w=600', unit: 'each', description: 'Sweet ripe pineapple, perfect for grilling', inStock: true, rating: 4.7, reviews: 101 },

  { id: '38', name: 'Peach (Each)', price: 103.2, category: 'Fruits', categoryId: '2', image: 'https://images.unsplash.com/photo-1570978561297-793391262fea?w=600', unit: 'each', description: 'Juicy summer peaches with fragrant aroma', inStock: false, rating: 4.6, reviews: 69 },

  { id: '39', name: 'Parmesan Shavings', price: 439.2, category: 'Dairy', categoryId: '3', image: 'https://images.unsplash.com/photo-1642354571956-d77dfd9596bb?w=600', unit: 'per pack', description: 'Savory Parmesan shavings to top salads and pasta', inStock: true, rating: 4.8, reviews: 154 },

  { id: '40', name: 'Multigrain Rolls (4)', price: 263.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400', unit: 'pack', description: 'Soft multigrain rolls, hearty and filling', inStock: true, rating: 4.5, reviews: 60 },

  { id: '41', name: 'Lamb Chops', price: 1199.2, category: 'Meat', categoryId: '5', image: 'https://images.unsplash.com/photo-1692106914421-e04e1066bd62?w=600', unit: 'per lb', description: 'Tender lamb chops, premium cut', inStock: false, rating: 4.6, reviews: 48 },

  { id: '42', name: 'Plant-based Burger Patties', price: 559.2, category: 'Meat', categoryId: '5', image: 'https://plus.unsplash.com/premium_photo-1664648063625-1e46d6bbe4db?w=600', unit: 'pack', description: 'Meat-free burger patties, high protein', inStock: true, rating: 4.3, reviews: 89 },

  { id: '43', name: 'Iced Lemon Tea (1L)', price: 199.2, category: 'Beverages', categoryId: '6', image: 'https://plus.unsplash.com/premium_photo-1664391802903-aa09789f9a3e?w=600', unit: 'per bottle', description: 'Refreshing iced lemon tea, lightly sweetened', inStock: false, rating: 4.2, reviews: 54 },

  { id: '44', name: 'Matcha Latte Mix', price: 679.2, category: 'Beverages', categoryId: '6', image: 'https://images.unsplash.com/photo-1626595444746-59219e6838ac?w=600', unit: 'box', description: 'Instant matcha latte powder for quick drinks', inStock: true, rating: 4.6, reviews: 76 },

  { id: '45', name: 'Beetroot', price: 159.2, category: 'Vegetables', categoryId: '1', image: 'https://images.unsplash.com/photo-1527790806964-dfa3c2c7e032?w=600', unit: 'per lb', description: 'Earthy beetroots rich in color and nutrients', inStock: true, rating: 4.1, reviews: 34 },

  { id: '46', name: 'Avocado (Each)', price: 159.2, category: 'Fruits', categoryId: '2', image: 'https://plus.unsplash.com/premium_photo-1675715402461-9ac75a5b400e?w=600', unit: 'each', description: 'Creamy avocados, perfect for toast and salads', inStock: true, rating: 4.7, reviews: 198 },

  { id: '47', name: 'Flavored Greek Yogurt (4-pack)', price: 399.2, category: 'Dairy', categoryId: '3', image: 'https://plus.unsplash.com/premium_photo-1663855531713-836d43edde85?w=600', unit: 'pack', description: 'Assorted flavored Greek yogurts in single-serve cups', inStock: true, rating: 4.5, reviews: 102 },

  { id: '48', name: 'Focaccia Bread', price: 303.2, category: 'Bakery', categoryId: '4', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', unit: 'per loaf', description: 'Olive oil focaccia with rosemary and sea salt', inStock: true, rating: 4.8, reviews: 117 },

  { id: '49', name: 'Beef Jerky (Spicy)', price: 479.2, category: 'Meat', categoryId: '5', image: 'https://images.unsplash.com/photo-1719329466280-30d8a22e7cb5?w=600', unit: 'per pack', description: 'Spicy dried beef jerky, savory snack', inStock: true, rating: 4.4, reviews: 85 },

  { id: '50', name: 'Ginger Ale (12-pack)', price: 559.2, category: 'Beverages', categoryId: '6', image: 'https://plus.unsplash.com/premium_photo-1676979221494-0db2da5251f2?w=600', unit: 'pack', description: 'Classic ginger ale, great with meals or mixers', inStock: true, rating: 4.3, reviews: 66 }
];

