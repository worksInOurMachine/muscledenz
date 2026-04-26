class AppSdk {
  private getBaseUrl() {
    if (typeof window !== 'undefined') return ''; // Browser
    return process.env.NEXTAUTH_URL || 'http://localhost:3000'; // Server
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const baseUrl = this.getBaseUrl();
    const res = await fetch(`${baseUrl}/api${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }

  async find(collection: string, query: any = {}) {
    const searchParams = new URLSearchParams();
    if (query.filters) {
      // Basic filter handling - you might need more complex logic for nested filters
      Object.entries(query.filters).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle Strapi-like filters if needed, or just pass them as is
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, String(value));
        }
      });
    }
    
    if (query.pagination) {
      searchParams.append('page', String(query.pagination.page));
      searchParams.append('pageSize', String(query.pagination.pageSize));
    }

    const queryString = searchParams.toString();
    const endpoint = `/${collection}${queryString ? `?${queryString}` : ''}`;
    
    const res = await this.request(endpoint);
    
    // Mimic Strapi's response structure if necessary
    return {
      data: res.data.map((item: any) => ({
        id: item._id,
        attributes: item,
        ...item // Spread for direct access if needed
      })),
      meta: {
        pagination: {
          page: query.pagination?.page || 1,
          pageSize: query.pagination?.pageSize || 25,
          pageCount: 1, // You might want to calculate this from total
          total: res.data.length
        }
      }
    };
  }

  async findOne(collection: string, id: string | number, query: any = {}) {
    const res = await this.request(`/${collection}/${id}`);
    return {
      data: {
        id: res.data._id,
        attributes: res.data,
        ...res.data
      }
    };
  }

  async create(collection: string, data: any) {
    const res = await this.request(`/${collection}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return {
      data: {
        id: res.data._id,
        attributes: res.data,
        ...res.data
      }
    };
  }

  async update(collection: string, id: string | number, data: any) {
    const res = await this.request(`/${collection}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return {
      data: {
        id: res.data._id,
        attributes: res.data,
        ...res.data
      }
    };
  }

  async delete(collection: string, id: string | number) {
    return await this.request(`/${collection}/${id}`, {
      method: 'DELETE',
    });
  }
}

const strapi = new AppSdk();
export default strapi;
