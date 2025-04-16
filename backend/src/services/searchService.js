// src/services/searchService.js
import prisma from "../config/db.js";

class SearchService {
  // Helper function to create search conditions
  createSearchQuery(searchTerm, fields) {
    return {
      OR: fields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    };
  }

  // Product search with filters
  async searchProducts(searchParams) {
    const {
      query,
      category,
      collection,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10000,
    } = searchParams;

    const where = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { SKU: { contains: query, mode: "insensitive" } },
      ];
    }

    if (category) where.category_id = category;
    if (collection) where.collection_id = collection;
    if (minPrice || maxPrice) {
      where.base_price = {};
      if (minPrice) where.base_price.gte = parseFloat(minPrice);
      if (maxPrice) where.base_price.lte = parseFloat(maxPrice);
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        collection: true,
        images: true,
        variants: {
          include: {
            inventory: true,
          },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const total = await prisma.product.count({ where });

    return {
      data: products,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    };
  }

  // Customer search for admin
  async searchCustomers(searchParams) {
    const { query, page = 1, limit = 10 } = searchParams;

    const where = {
      role: "CUSTOMER",
      ...(query && this.createSearchQuery(query, ["name", "email", "phone"])),
    };

    const customers = await prisma.user.findMany({
      where,
      include: {
        addresses: true,
        orders: {
          take: 5,
          orderBy: { order_date: "desc" },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const total = await prisma.user.count({ where });

    return {
      data: customers,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    };
  }

  // Orders search
  async searchOrders(searchParams) {
    const {
      query,
      status,
      startDate,
      endDate,
      page = 1,
      limit = 10000,
    } = searchParams;

    const where = {};

    if (query) {
      where.OR = [
        { order_number: { contains: query, mode: "insensitive" } },
        { user: { name: { contains: query, mode: "insensitive" } } },
        { user: { email: { contains: query, mode: "insensitive" } } },
      ];
    }

    if (status) where.status = status;
    if (startDate || endDate) {
      where.order_date = {};
      if (startDate) where.order_date.gte = new Date(startDate);
      if (endDate) where.order_date.lte = new Date(endDate);
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: true,
        order_items: {
          include: {
            product_variant: {
              include: {
                product: true,
              },
            },
          },
        },
        shipping_address: true,
        order_shipments: true,
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: { order_date: "desc" },
    });

    const total = await prisma.order.count({ where });

    return {
      data: orders,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    };
  }

  // Categories search
  async searchCategories(searchParams) {
    const { query, page = 1, limit = 1000 } = searchParams;

    const where = query
      ? this.createSearchQuery(query, ["name", "description"])
      : {};

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: { products: true },
        },
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    const total = await prisma.category.count({ where });

    return {
      data: categories,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    };
  }

  // Coupons search
  async searchCoupons(searchParams) {
    const { query, isActive, page = 1, limit = 10 } = searchParams;

    const where = {};

    if (query) {
      where.OR = [
        { code: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    if (isActive !== undefined) {
      const now = new Date();
      where.AND = [{ start_date: { lte: now } }, { end_date: { gte: now } }];
    }

    const coupons = await prisma.coupon.findMany({
      where,
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      orderBy: { end_date: "asc" },
    });

    const total = await prisma.coupon.count({ where });

    return {
      data: coupons,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page),
      },
    };
  }
}

export default new SearchService();
