/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary(); // Auto-incrementing user ID (Primary Key)
      table.string("username").notNullable().unique(); // User's username
      table.string("email").notNullable().unique(); // User's email
      table.string("password").notNullable(); // User's hashed password
      table.string("reset_token"); // Password reset token field
      table.string("first_name"); // User's first name
      table.string("last_name"); // User's last name
      table.date("date_of_birth"); // User's date of birth
      table.string("gender"); // User's gender
      table.string("profile_picture"); // URL to user's profile picture
      table.text("bio"); // User's biography
      table.string("location"); // User's location
      table.string("phone_number"); // User's phone number
      table.boolean("email_verified").defaultTo(false); // Email verification status
      table.timestamps(true, true); // Created_at and updated_at timestamps
      table.boolean("is_admin").defaultTo(false); // User role or admin status
      table.boolean("two_factor_auth").defaultTo(false); // Two-factor authentication status
      // Add any additional fields here
    })
    .then(() =>
      knex.schema.createTable("products", (table) => {
        table.increments("id").primary(); // Auto-incrementing product ID (Primary Key)
        table.string("name").notNullable(); // Product name
        table.string("code"); // Product code
        table.text("description"); // Product description
        table.string("category"); // Product category
        table.string("brand"); // Product brand
        table.decimal("price", 10, 2).notNullable(); // Product price (up to 10 digits with 2 decimal places)
        table.string("unit_of_measurement"); // Unit of measurement
        table.integer("stock_quantity").notNullable(); // Stock quantity
        table.string("image_url"); // URL to product image
        table.decimal("discount_price", 10, 2); // Discounted price
        table.date("discount_expiry_date"); // Discount expiry date
        table.string("barcode"); // Product barcode
        table.timestamp("date_added").defaultTo(knex.fn.now()); // Date added timestamp
        table.timestamp("last_updated").defaultTo(knex.fn.now()); // Last updated timestamp
        table.boolean("is_featured").defaultTo(false); // Featured status
        table.boolean("is_available").defaultTo(true); // Availability status
        table.float("rating", 2, 1); // Product rating (up to 2 digits with 1 decimal place)
        table.text("ingredients"); // Ingredients or composition
        table.string("country_of_origin"); // Country of origin
        table.string("seller_info"); // Seller or supplier information
        // Add any additional fields here
      })
    )
    .then(() =>
      knex.schema.createTable("orders", (table) => {
        table.increments("id").primary(); // Order ID
        table.integer("user_id").unsigned().notNullable(); // Customer (user) ID
        table.foreign("user_id").references("users.id"); // Reference to the users table
        table.timestamp("order_date").defaultTo(knex.fn.now()); // Order date
        table.decimal("total_amount", 10, 2).notNullable(); // Total order amount
        // Add any additional order-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("order_items", (table) => {
        table.increments("id").primary(); // Order item ID
        table.integer("order_id").unsigned().notNullable(); // Order ID
        table.foreign("order_id").references("orders.id"); // Reference to the orders table
        table.integer("product_id").unsigned().notNullable(); // Product ID
        table.foreign("product_id").references("products.id"); // Reference to the products table
        table.integer("quantity").notNullable(); // Quantity of the product in the order
        table.decimal("unit_price", 10, 2).notNullable(); // Unit price of the product
        // Add any additional order item-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("payment_transactions", (table) => {
        table.increments("id").primary(); // Transaction ID
        table.integer("order_id").unsigned().notNullable(); // Order ID
        table.foreign("order_id").references("orders.id"); // Reference to the orders table
        table.decimal("amount", 10, 2).notNullable(); // Transaction amount
        table.string("payment_method").notNullable(); // Payment method (e.g., credit card, PayPal)
        table.timestamp("transaction_date").defaultTo(knex.fn.now()); // Transaction date
        // Add any additional transaction-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("shipping_information", (table) => {
        table.increments("id").primary(); // Shipping info ID
        table.integer("order_id").unsigned().notNullable(); // Order ID
        table.foreign("order_id").references("orders.id"); // Reference to the orders table
        table.string("recipient_name").notNullable(); // Recipient's name
        table.string("address").notNullable(); // Shipping address
        table.string("city").notNullable(); // Shipping city
        table.string("state").notNullable(); // Shipping state
        table.string("postal_code").notNullable(); // Shipping postal code
        table.string("country").notNullable(); // Shipping country
        // Add any additional shipping-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("reviews_ratings", (table) => {
        table.increments("id").primary(); // Review ID
        table.integer("product_id").unsigned().notNullable(); // Product ID
        table.foreign("product_id").references("products.id"); // Reference to the products table
        table.integer("user_id").unsigned().notNullable(); // User ID
        table.foreign("user_id").references("users.id"); // Reference to the users table
        table.text("review_text"); // Review text
        table.integer("rating").notNullable(); // Rating (e.g., 1-5 stars)
        table.timestamp("review_date").defaultTo(knex.fn.now()); // Review date
        // Add any additional review-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("wishlist", (table) => {
        table.increments("id").primary(); // Wishlist item ID
        table.integer("user_id").unsigned().notNullable(); // User ID
        table.foreign(" user_id").references("users.id"); // Reference to the users table
        table.integer("product_id").unsigned().notNullable(); // Product ID
        table.foreign("product_id").references("products.id"); // Reference to the products table
        // Add any additional wishlist-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("coupons_promotions", (table) => {
        table.increments("id").primary(); // Coupon/promotion ID
        table.string("code").unique().notNullable(); // Coupon code
        table.decimal("discount_percentage", 5, 2).notNullable(); // Discount percentage
        table.timestamp("valid_from").notNullable(); // Valid from date
        table.timestamp("valid_to").notNullable(); // Valid to date
        // Add any additional coupon/promotion-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("cart", (table) => {
        table.increments("id").primary(); // Cart item ID
        table.integer("user_id").unsigned().notNullable(); // User ID
        table.foreign("user_id").references("users.id"); // Reference to the users table
        table.integer("product_id").unsigned().notNullable(); // Product ID
        table.foreign("product_id").references("products.id"); // Reference to the products table
        table.integer("quantity").notNullable(); // Quantity of the product in the cart
        // Add any additional cart-related fields here
      })
    )
    .then(() =>
      knex.schema.createTable("shipping_methods", (table) => {
        table.increments("id").primary(); // Shipping method ID
        table.string("name").notNullable(); // Shipping method name
        table.decimal("cost", 10, 2).notNullable(); // Shipping cost
        // Add any additional shipping method-related fields here
      })
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // Drop the "users" table
  return knex.schema
    .dropTableIfExists("shipping_methods")
    .then(() => knex.schema.dropTableIfExists("cart"))
    .then(() => knex.schema.dropTableIfExists("coupons_promotions"))
    .then(() => knex.schema.dropTableIfExists("shipping_methods"))
    .then(() => knex.schema.dropTableIfExists("wishlist"))
    .then(() => knex.schema.dropTableIfExists("reviews_ratings"))
    .then(() => knex.schema.dropTableIfExists("shipping_information"))
    .then(() => knex.schema.dropTableIfExists("payment_transactions"))
    .then(() => knex.schema.dropTableIfExists("order_items"))
    .then(() => knex.schema.dropTableIfExists("orders"))
    .then(() => knex.schema.dropTableIfExists("products"))
    .then(() => knex.schema.dropTableIfExists("users"));
};
