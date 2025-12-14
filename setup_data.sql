-- Create admin user
INSERT INTO users (created_at, updated_at, active, email, email_verified, full_name, password, phone, role) 
VALUES (NOW(), NOW(), 1, 'admin@revcart.com', 1, 'Admin User', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1234567890', 'ADMIN');

-- Insert categories
INSERT INTO categories 
(id, created_at, updated_at, description, image_url, name, slug)
VALUES
(1, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400', 'Vegetables', 'vegetables'),
(2, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400', 'Fruits', 'fruits'),
(3, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', 'Dairy', 'dairy'),
(4, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Bakery', 'bakery'),
(5, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400', 'Meat', 'meat'),
(6, NOW(), NOW(), NULL, 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400', 'Beverages', 'beverages');

-- Insert products
INSERT INTO products
(id, created_at, updated_at, active, brand, description, discount, highlights, image_url, name, price, sku, tag, category_id)
VALUES
(1, NOW(), NOW(), 1, NULL, 'Fresh, juicy tomatoes perfect for salads and cooking', NULL, NULL, 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=600&auto=format&fit=crop&q=60', 'Fresh Tomatoes', 239.2, 'SKU-1', 'NONE', 1),
(2, NOW(), NOW(), 1, NULL, 'Ripe organic bananas, naturally sweet', NULL, NULL, 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400', 'Organic Bananas', 159.2, 'SKU-2', 'NONE', 2),
(3, NOW(), NOW(), 1, NULL, 'Farm-fresh whole milk', NULL, NULL, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'Fresh Milk', 279.2, 'SKU-3', 'NONE', 3),
(4, NOW(), NOW(), 1, NULL, 'Freshly baked whole wheat bread', NULL, NULL, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Whole Wheat Bread', 199.2, 'SKU-4', 'NONE', 4),
(5, NOW(), NOW(), 1, NULL, 'Fresh, skinless chicken breast', NULL, NULL, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', 'Chicken Breast', 719.2, 'SKU-5', 'NONE', 5),
(6, NOW(), NOW(), 1, NULL, 'Crisp iceberg lettuce for sandwiches and salads', NULL, NULL, 'https://images.unsplash.com/photo-1657411658285-2742c4c5ed1d?w=600', 'Crisp Lettuce', 143.2, 'SKU-6', 'NONE', 1),
(7, NOW(), NOW(), 1, NULL, 'Sweet red bell peppers, crunchy and colorful', NULL, NULL, 'https://images.unsplash.com/photo-1608737637507-9aaeb9f4bf30?w=600', 'Red Bell Peppers', 263.2, 'SKU-7', 'NONE', 1),
(8, NOW(), NOW(), 0, NULL, 'Tender baby spinach leaves, washed and ready', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1701699257548-8261a687236f?w=600', 'Baby Spinach', 239.2, 'SKU-8', 'NONE', 1),
(9, NOW(), NOW(), 1, NULL, 'Starchy russet potatoes, great for baking and mashing', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1723600901806-8a98c9ebc094?w=600', 'Russet Potatoes', 79.2, 'SKU-9', 'NONE', 1),
(10, NOW(), NOW(), 1, NULL, 'Sweet organic carrots, perfect for snacking', NULL, NULL, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600', 'Carrots (Organic)', 199.2, 'SKU-10', 'NONE', 1),
(11, NOW(), NOW(), 1, NULL, 'Crisp and tart green apples, ideal for pies', NULL, NULL, 'https://images.unsplash.com/photo-1577028300036-aa112c18d109?w=600', 'Green Apples', 183.2, 'SKU-11', 'NONE', 2),
(12, NOW(), NOW(), 1, NULL, 'Sweet and juicy strawberries, locally sourced', NULL, NULL, 'https://images.unsplash.com/photo-1582472138480-e84227671cd4?w=600', 'Strawberries (Pint)', 319.2, 'SKU-12', 'NONE', 2),
(13, NOW(), NOW(), 0, NULL, 'Fresh blueberries, great for smoothies', NULL, NULL, 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', 'Blueberries (Pint)', 359.2, 'SKU-13', 'NONE', 2),
(14, NOW(), NOW(), 1, NULL, 'Sweet seedless grapes, snack-ready', NULL, NULL, 'https://images.unsplash.com/photo-1574871866887-911cff04aef1?w=600', 'Seedless Grapes', 287.2, 'SKU-14', 'NONE', 2),
(15, NOW(), NOW(), 1, NULL, 'Juicy ripe mangoes, fragrant and sweet', NULL, NULL, 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?w=600', 'Mango (Ripe)', 119.2, 'SKU-15', 'NONE', 2),
(16, NOW(), NOW(), 1, NULL, 'Thick plain Greek yogurt, high in protein', NULL, NULL, 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=600', 'Greek Yogurt (Plain)', 479.2, 'SKU-16', 'NONE', 3),
(17, NOW(), NOW(), 1, NULL, 'Aged cheddar cheese, sharp and flavorful', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1760605911334-090ac301cc15?w=600', 'Cheddar Cheese Block', 519.2, 'SKU-17', 'NONE', 3),
(18, NOW(), NOW(), 1, NULL, 'Creamy salted butter for baking and cooking', NULL, NULL, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', 'Butter (Salted)', 319.2, 'SKU-18', 'NONE', 3),
(19, NOW(), NOW(), 1, NULL, 'Free-range eggs, medium size', NULL, NULL, 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400', 'Eggs (Dozen)', 239.2, 'SKU-19', 'NONE', 3),
(20, NOW(), NOW(), 1, NULL, 'Light and creamy cottage cheese', NULL, NULL, 'https://images.unsplash.com/photo-1661349008073-136bed6e6788?w=600', 'Cottage Cheese', 359.2, 'SKU-20', 'NONE', 3),
(21, NOW(), NOW(), 1, NULL, 'Artisan sourdough with a crisp crust', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?w=600', 'Sourdough Loaf', 319.2, 'SKU-21', 'NONE', 4),
(22, NOW(), NOW(), 1, NULL, 'Buttery, flaky croissants baked fresh daily', NULL, NULL, 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400', 'Croissants (Pack of 4)', 439.2, 'SKU-22', 'NONE', 4),
(23, NOW(), NOW(), 1, NULL, 'Chewy bagels, assorted flavors', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1720070416636-0e5ef67d3862?w=600', 'Bagels (6-pack)', 399.2, 'SKU-23', 'NONE', 4),
(24, NOW(), NOW(), 1, NULL, 'Rich chocolate muffins with chocolate chips', NULL, NULL, 'https://images.unsplash.com/photo-1586111893496-8f91022df73a?w=600', 'Chocolate Muffins (2)', 239.2, 'SKU-24', 'NONE', 4),
(25, NOW(), NOW(), 1, NULL, 'Moist banana bread packed with banana flavor', NULL, NULL, 'https://images.unsplash.com/photo-1642068151095-e44d35b7ad8a?w=600', 'Banana Bread Loaf', 343.2, 'SKU-25', 'NONE', 4),
(26, NOW(), NOW(), 1, NULL, 'Fresh ground beef, ideal for burgers', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1668616816953-a02cd1a44027?w=600', 'Ground Beef (80/20)', 639.2, 'SKU-26', 'NONE', 5),
(27, NOW(), NOW(), 1, NULL, 'Boneless pork chops, tender cut', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1722686483348-2324b28215d2?w=600', 'Pork Chops', 559.2, 'SKU-27', 'NONE', 5),
(28, NOW(), NOW(), 1, NULL, 'Fresh wild-caught salmon fillet', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1726768907990-d3cbc8efdee5?w=600', 'Salmon Fillet', 1039.2, 'SKU-28', 'NONE', 5),
(29, NOW(), NOW(), 1, NULL, 'Smoked bacon, thick cut', NULL, NULL, 'https://images.unsplash.com/photo-1694983361629-0363ab0d1b49?w=600', 'Bacon (Smoked)', 479.2, 'SKU-29', 'NONE', 5),
(30, NOW(), NOW(), 0, NULL, 'Thin-sliced deli turkey, low sodium', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1664392048940-3e08720a4207?w=600', 'Turkey Slices (Deli)', 399.2, 'SKU-30', 'NONE', 5),
(31, NOW(), NOW(), 1, NULL, 'Fresh squeezed orange juice, no added sugar', NULL, NULL, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 'Orange Juice (Fresh)', 319.2, 'SKU-31', 'NONE', 6),
(32, NOW(), NOW(), 1, NULL, 'Natural sparkling water, crisp and refreshing', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1687354256687-b5ee47c043c1?w=600', 'Sparkling Water (6-pack)', 359.2, 'SKU-32', 'NONE', 6),
(33, NOW(), NOW(), 1, NULL, 'Smooth cold brew coffee, ready to drink', NULL, NULL, 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?w=600', 'Cold Brew Coffee (12 oz)', 279.2, 'SKU-33', 'NONE', 6),
(34, NOW(), NOW(), 1, NULL, 'Assorted herbal tea bags for relaxation', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1731696604013-52ccf4c49bd9?w=600', 'Herbal Tea Assortment', 479.2, 'SKU-34', 'NONE', 6),
(35, NOW(), NOW(), 1, NULL, 'Unsweetened almond milk, dairy-free', NULL, NULL, 'https://images.unsplash.com/photo-1601436423474-51738541c1b1?w=600', 'Almond Milk (Unsweetened)', 279.2, 'SKU-35', 'NONE', 6),
(36, NOW(), NOW(), 0, NULL, 'Pre-mixed salad greens with arugula and spinach', NULL, NULL, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', 'Mixed Salad Pack', 343.2, 'SKU-36', 'NONE', 1),
(37, NOW(), NOW(), 1, NULL, 'Sweet ripe pineapple, perfect for grilling', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1724255994628-dceb76a829e8?w=600', 'Pineapple (Whole)', 239.2, 'SKU-37', 'NONE', 2),
(38, NOW(), NOW(), 0, NULL, 'Juicy summer peaches with fragrant aroma', NULL, NULL, 'https://images.unsplash.com/photo-1570978561297-793391262fea?w=600', 'Peach (Each)', 103.2, 'SKU-38', 'NONE', 2),
(39, NOW(), NOW(), 1, NULL, 'Savory Parmesan shavings to top salads and pasta', NULL, NULL, 'https://images.unsplash.com/photo-1642354571956-d77dfd9596bb?w=600', 'Parmesan Shavings', 439.2, 'SKU-39', 'NONE', 3),
(40, NOW(), NOW(), 1, NULL, 'Soft multigrain rolls, hearty and filling', NULL, NULL, 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=400', 'Multigrain Rolls (4)', 263.2, 'SKU-40', 'NONE', 4),
(41, NOW(), NOW(), 0, NULL, 'Tender lamb chops, premium cut', NULL, NULL, 'https://images.unsplash.com/photo-1692106914421-e04e1066bd62?w=600', 'Lamb Chops', 1199.2, 'SKU-41', 'NONE', 5),
(42, NOW(), NOW(), 1, NULL, 'Meat-free burger patties, high protein', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1664648063625-1e46d6bbe4db?w=600', 'Plant-based Burger Patties', 559.2, 'SKU-42', 'NONE', 5),
(43, NOW(), NOW(), 0, NULL, 'Refreshing iced lemon tea, lightly sweetened', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1664391802903-aa09789f9a3e?w=600', 'Iced Lemon Tea (1L)', 199.2, 'SKU-43', 'NONE', 6),
(44, NOW(), NOW(), 1, NULL, 'Instant matcha latte powder for quick drinks', NULL, NULL, 'https://images.unsplash.com/photo-1626595444746-59219e6838ac?w=600', 'Matcha Latte Mix', 679.2, 'SKU-44', 'NONE', 6),
(45, NOW(), NOW(), 1, NULL, 'Earthy beetroots rich in color and nutrients', NULL, NULL, 'https://images.unsplash.com/photo-1527790806964-dfa3c2c7e032?w=600', 'Beetroot', 159.2, 'SKU-45', 'NONE', 1),
(46, NOW(), NOW(), 1, NULL, 'Creamy avocados, perfect for toast and salads', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1675715402461-9ac75a5b400e?w=600', 'Avocado (Each)', 159.2, 'SKU-46', 'NONE', 2),
(47, NOW(), NOW(), 1, NULL, 'Assorted flavored Greek yogurts in single-serve cups', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1663855531713-836d43edde85?w=600', 'Flavored Greek Yogurt (4-pack)', 399.2, 'SKU-47', 'NONE', 3),
(48, NOW(), NOW(), 1, NULL, 'Olive oil focaccia with rosemary and sea salt', NULL, NULL, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', 'Focaccia Bread', 303.2, 'SKU-48', 'NONE', 4),
(49, NOW(), NOW(), 1, NULL, 'Spicy dried beef jerky, savory snack', NULL, NULL, 'https://images.unsplash.com/photo-1719329466280-30d8a22e7cb5?w=600', 'Beef Jerky (Spicy)', 479.2, 'SKU-49', 'NONE', 5),
(50, NOW(), NOW(), 1, NULL, 'Classic ginger ale, great with meals or mixers', NULL, NULL, 'https://plus.unsplash.com/premium_photo-1676979221494-0db2da5251f2?w=600', 'Ginger Ale (12-pack)', 559.2, 'SKU-50', 'NONE', 6);

-- Create inventory entries for products
INSERT INTO inventory (created_at, updated_at, available_quantity, reserved_quantity, product_id)
SELECT 
    NOW(),
    NOW(),
    FLOOR(RAND() * 100) + 10 as available_quantity,
    0 as reserved_quantity,
    p.id
FROM products p;