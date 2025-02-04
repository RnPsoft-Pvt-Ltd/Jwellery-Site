class Pagination {
    static getValidPageAndLimit(page = 1, limit = 10, maxLimit = 100) {
      // Ensure we're working with numbers and have valid defaults
      const validPage = Math.max(1, parseInt(page, 10) || 1);
      const validLimit = Math.max(1, Math.min(maxLimit, parseInt(limit, 10) || 10));
  
      return {
        validPage,
        validLimit,
        skip: (validPage - 1) * validLimit,
        take: validLimit
      };
    }
  
    static createPaginationInfo(total, validPage, validLimit) {
      return {
        total,
        totalPages: Math.ceil(total / validLimit),
        currentPage: validPage,
        perPage: validLimit
      };
    }
  
    static async getPaginatedResponse(prismaModel, {
      page = 1,
      limit = 10,
      maxLimit = 100,
      where = {},
      include = {},
      orderBy = {}
    }) {
      const { validPage, validLimit, skip, take } = this.getValidPageAndLimit(page, limit, maxLimit);
  
      // Add console.log for debugging
      console.log('Pagination values:', {
        requestedPage: page,
        requestedLimit: limit,
        validPage,
        validLimit,
        skip,
        take
      });
  
      const [data, total] = await Promise.all([
        prismaModel.findMany({
          where,
          include,
          skip,
          take,
          orderBy
        }),
        prismaModel.count({ where })
      ]);
  
      const paginationInfo = this.createPaginationInfo(total, validPage, validLimit);
  
      // Add console.log for debugging
      console.log('Response info:', {
        dataLength: data.length,
        paginationInfo
      });
  
      return {
        data,
        pagination: paginationInfo
      };
    }
  }
  
  export default Pagination;