import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Clean existing data
    await cleanDatabase();

    // Create users with different roles
    const users = await createUsers();
    console.log("✅ Created users");

    // Create categories with subcategories
    const categories = await createCategories();
    console.log("✅ Created categories");

    // Create collections
    const collections = await createCollections();
    console.log("✅ Created collections");

    // Create tax categories
    const taxCategories = await createTaxCategories();
    console.log("✅ Created tax categories");

    // Create products with variants and related data
    const products = await createProducts(
      categories,
      collections,
      taxCategories
    );
    console.log("✅ Created products");

    // Create addresses for users
    const addresses = await createAddresses(users);
    console.log("✅ Created addresses");

    // Create coupons
    const coupons = await createCoupons();
    console.log("✅ Created coupons");

    // Create orders (now with coupons)
    const orders=await createOrders(users, products, addresses, coupons);
    console.log("✅ Created orders");

    // Create reviews
    await createReviews(users, products);
    console.log("✅ Created reviews");

    // Add tax jurisdiction
    const taxJurisdictions = await createTaxJurisdictions();
    console.log("✅ Created tax jurisdictions");

    // Create order shipments
    await createOrderShipments(orders);
    console.log("✅ Created order shipments");

    console.log("🌱 Seeding completed successfully");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function cleanDatabase() {
  const tablenames =
    await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
  } catch (error) {
    console.log("Error while cleaning database:", error);
  }
}

async function createUsers() {
  const users = [];

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password_hash: await hash("admin123", 10),
      phone: "+1234567890",
      role: "ADMIN",
      is_verified: true,
      date_of_birth: new Date("1990-01-01"),
      user_preferences: {
        create: {
          language: "en",
          currency: "INR",
          notification_settings: {
            email: true,
            sms: true,
          },
        },
      },
    },
  });
  users.push(adminUser);

  // Create regular customers
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Customer ${i}`,
        email: `customer${i}@example.com`,
        password_hash: await hash("customer123", 10),
        phone: `+1234567${i}`,
        role: "CUSTOMER",
        is_verified: true,
        date_of_birth: new Date(`199${i}-01-01`),
        user_preferences: {
          create: {
            language: "en",
            currency: "USD",
            notification_settings: {
              email: true,
              sms: true,
            },
          },
        },
      },
    });
    users.push(user);
  }

  return users;
}

async function createCategories() {

  await prisma.category.createMany({
    data: [
      {
        name: "Rings",
        description: "Beautiful rings collection",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2029.png",
      },
      {
        name: "Necklaces",
        description: "Elegant necklaces",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2031.png",

      },
      {
        name: "Earrings",
        description: "Stunning earrings",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%2030.png",

      },
      {
        name: "Bracelets",
        description: "Stylish bracelets",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/bracelet-category.png",
      },
      {
        name: "Amulets",
        description: "Lucky amulets",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/amulet.png",

      },
      {
        name: "Brooches",
        description: "Trendy brooches",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/brooch-category.png",

      },
    ],
  });

  return prisma.category.findMany();
}

async function createCollections() {
  const collections = await prisma.collection.createMany({
    data: [
      {
        name: "Mens Collection",
        description: "Stylish mens jewellery",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/mens.jpeg",
      },
      {
        name: "Women Collection",
        description: "Elegant womens jewellery",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/women.jpeg",
      },
      {
        name: "Kids Collection",
        description: "Cute kids jewellery",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/kids.jpeg",
      },
      {
        name: "Gold Collection",
        description: "Exquisite gold jewelry",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/gold-carousel.png",
      },
      {
        name: "Silver Collection",
        description: "Elegant silver jewelry",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/silver-carousel.png",
      },
      {
        name: "Platinum Collection",
        description: "Luxurious platinum jewelry",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/Frame%201321315013.png",
      },
      {
        name: "Pearl Collection",
        description: "Beautiful pearl jewelry",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/pearl-carousel.png",
      },
      {
        name: "Wedding Jwellery",
        description: "Jwellery for wedding",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/1.jpeg",
      },
      {
        name: "Auspicious Jwellery",
        description: "Jwellery for auspicious occasions",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/3.jpeg",
      },
      {
        name: "Festive Jwellery",
        description: "Jwellery for festive occasions",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/2.jpeg",
      },
      {
        name: "Party Jwellery",
        description: "Jwellery for party wear",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/party-wear.png",
      },
      {
        name: "Casual Jwellery",
        description: "Jwellery for casual wear",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/common-wear.png",
      },
      {
        name: "Date Night Jwellery",
        description: "Jwellery for date nights",
        thumbnail: "https://storage.googleapis.com/jwelleryrnpsoft/date-night.png",
      },
    ],
  });

  return prisma.collection.findMany();
}

async function createTaxCategories() {
  const taxCategories = await prisma.taxCategory.createMany({
    data: [
      {
        name: "Standard Rate",
        standard_rate: 0.2,
        description: "Standard tax rate for most items",
      },
      {
        name: "Reduced Rate",
        standard_rate: 0.1,
        description: "Reduced tax rate for selected items",
      },
    ],
  });

  return prisma.taxCategory.findMany();
}

async function createProducts(categories, collections, taxCategories) {
  const products = [];

  for (let i = 1; i <= 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: `Product ${i}`,
        brand: `Brand ${i}`,
        category_id: categories[i % categories.length].id,
        collection_id: collections[i % collections.length].id,
        tax_category_id: taxCategories[i % taxCategories.length].id,
        base_price: 100 + i * 10,
        description: `Description for product ${i}`,
        SKU: `SKU${i}`,
        product_metadata: {
          create: {
            material_type: "Gold",
            metal_purity: "18K",
            gemstone_details: "Diamond",
            additional_attributes: {
              weight: "10g",
              dimensions: "10x10x10mm",
            },
          },
        },
        variants: {
          create: [
            {
              size: "S",
              color: "Gold",
              weight: 10.5,
              price_modifier: 0,
              inventory: {
                create: {
                  total_quantity: 100,
                  reserved_quantity: 0,
                  minimum_stock_alert: 10,
                },
              },
            },
            {
              size: "M",
              color: "Silver",
              weight: 12.5,
              price_modifier: 20,
              inventory: {
                create: {
                  total_quantity: 75,
                  reserved_quantity: 0,
                  minimum_stock_alert: 10,
                },
              },
            },
          ],
        },
        images: {
          create: [
            {
              image_url: `https://storage.googleapis.com/jwelleryrnpsoft/3.jpeg`,
              is_primary: true,
              display_order: 1,
            },
            {
              image_url: `https://storage.googleapis.com/jwelleryrnpsoft/3.jpeg`,
              is_primary: false,
              display_order: 2,
            },
          ],
        },
      },
      include: {
        variants: true,
      },
    });
    products.push(product);
  }

  return products;
}

async function createAddresses(users) {
  const addresses = [];

  for (const user of users) {
    const address = await prisma.address.create({
      data: {
        user_id: user.id,
        full_name: user.name,
        phone: user.phone,
        address_line1: "123 Main St",
        address_line2: "Apt 4B",
        city: "New York",
        state: "NY",
        country: "USA",
        zip_code: "10001",
        is_primary: true,
      },
    });
    addresses.push(address);
  }

  return addresses;
}

async function createCoupons() {
  const coupons = await prisma.coupon.createMany({
    data: [
      {
        code: "WELCOME10",
        description: "Welcome discount for new customers",
        start_date: new Date(),
        end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        free_shipping: false,
        max_discount: 100.0,
        usage_limit: 1000,
        discount_type: "PERCENTAGE",
      },
      {
        code: "FREESHIP",
        description: "Free shipping on all orders",
        start_date: new Date(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        free_shipping: true,
        max_discount: 50.0,
        usage_limit: 500,
        discount_type: "SHIPPING",
      },
      {
        code: "SUMMER25",
        description: "25% off summer collection",
        start_date: new Date(),
        end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        free_shipping: false,
        max_discount: 250.0,
        usage_limit: 2000,
        discount_type: "PERCENTAGE",
      },
      {
        code: "FLAT50",
        description: "Flat $50 off on orders above $200",
        start_date: new Date(),
        end_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        free_shipping: false,
        max_discount: 50.0,
        usage_limit: 1000,
        discount_type: "FIXED",
      },
    ],
  });

  return prisma.coupon.findMany();
}

async function createTaxJurisdictions() {
  const taxJurisdictions = await prisma.taxJurisdiction.createMany({
    data: [
      {
        country: "USA",
        state: "NY",
        city: "New York",
        base_tax_rate: 0.0875, // 8.75%
        additional_tax_rules: {
          luxury_rate: 0.04,
          special_categories: ["jewelry", "watches"]
        }
      },
      {
        country: "USA",
        state: "CA",
        city: "Los Angeles",
        base_tax_rate: 0.0950, // 9.5%
        additional_tax_rules: {
          luxury_rate: 0.03,
          special_categories: ["jewelry", "premium"]
        }
      },
      {
        country: "USA",
        state: "FL",
        city: "Miami",
        base_tax_rate: 0.0700, // 7%
        additional_tax_rules: {
          tourism_tax: 0.02,
          exempt_categories: ["essential"]
        }
      }
    ]
  });

  return prisma.taxJurisdiction.findMany();
}

async function createOrders(users, products, addresses, coupons) {
  const createdOrders = []; // Array to store created orders

  for (const user of users) {
    const userAddress = addresses.find((addr) => addr.user_id === user.id);
    const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
    const orderTotal = 500; // Base order total
    const appliedDiscount =
      randomCoupon.discount_type === "PERCENTAGE"
        ? Math.min(orderTotal * 0.25, randomCoupon.max_discount) // 25% discount for percentage types
        : Math.min(50, randomCoupon.max_discount); // Fixed amount for other types

    const order=await prisma.order.create({
      data: {
        user_id: user.id,
        shipping_address_id: userAddress.id,
        billing_address_id: userAddress.id,
        order_number: `ORD-${Date.now()}-${user.id}`,
        status: "PROCESSING",
        total_amount: orderTotal - appliedDiscount,
        order_items: {
          create: products.slice(0, 2).map((product) => ({
            product_variant_id: product.variants[0].id,
            quantity: 1,
            unit_price: product.base_price,
          })),
        },
        order_coupons: {
          create: {
            coupon_id: randomCoupon.id,
            applied_discount: appliedDiscount,
          },
        },
      },
    });
    createdOrders.push(order);
  }
  return createdOrders; // Return the created orders
}

async function createReviews(users, products) {
  for (const user of users) {
    for (const product of products.slice(0, 3)) {
      await prisma.productReview.create({
        data: {
          user_id: user.id,
          product_id: product.id,
          rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
          comment: `Great product! Review by ${user.name}`,
        },
      });
    }
  }
}

async function createOrderShipments(orders) {
  const carriers = ["FedEx", "UPS", "DHL", "USPS"];
  const shipmentStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

  for (const order of orders) {
    const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
    const randomStatus = shipmentStatuses[Math.floor(Math.random() * shipmentStatuses.length)];
    
    let shippedAt = null;
    let estimatedDelivery = null;

    if (randomStatus === "SHIPPED" || randomStatus === "DELIVERED") {
      shippedAt = new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000); // Random date within last 7 days
      estimatedDelivery = new Date(shippedAt.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days after shipped date
    } else if (randomStatus === "PROCESSING") {
      estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    }

    await prisma.orderShipment.create({
      data: {
        order_id: order.id,
        carrier: randomCarrier,
        tracking_number: `${randomCarrier}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: randomStatus,
        shipped_at: shippedAt,
        estimated_delivery: estimatedDelivery,
      },
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
