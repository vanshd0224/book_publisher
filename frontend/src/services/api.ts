const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  'https://book-publisher-backend-451315399249.asia-south1.run.app/api/v1';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json();
  if (!response.ok || (json && json.success === false)) {
    const errorMsg = json?.error?.message || json?.message || 'API call failed';
    throw new Error(errorMsg);
  }

  return json.data !== undefined ? json.data : json;
};

export const productService = {
  getProducts: (volumeNumber?: number) =>
    apiFetch(`/products${volumeNumber !== undefined ? `?volumeNumber=${volumeNumber}` : ''}`),
  getProductById: (id: string) => apiFetch(`/products/${id}`),
};

export const cartService = {
  getCart: (sessionId?: string) =>
    apiFetch(`/cart${sessionId ? `?sessionId=${sessionId}` : ''}`),
  addToCart: (productId: string, quantity: number, sessionId?: string) =>
    apiFetch('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, sessionId }),
    }),
  updateCart: (itemId: string, quantity: number) =>
    apiFetch(`/cart/update/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  removeFromCart: (itemId: string) =>
    apiFetch(`/cart/remove/${itemId}`, { method: 'DELETE' }),
};

export const orderService = {
  createIndividualOrder: (items: any[], shippingAddress: string) =>
    apiFetch('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ items, shippingAddress, paymentMethod: 'RAZORPAY' }),
    }),
  createInstitutionalOrder: (items: any[], shippingAddress: string, tdsExpected: number = 0) =>
    apiFetch('/orders/institutional', {
      method: 'POST',
      body: JSON.stringify({ items, shippingAddress, paymentMethod: 'PO', tdsExpected }),
    }),
  uploadPO: async (orderId: string, file: File) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/upload-po`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    return response.json();
  },
  getMyOrders: () => apiFetch('/orders/my-orders'),
};

export const leadService = {
  submitLead: (name: string, email: string, phone: string, collegeName: string, notes?: string) =>
    apiFetch('/leads', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, collegeName, source: 'FORM', notes }),
    }),
};

export const authService = {
  login: async (email: string, password: string) => {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.accessToken) {
      setAuthToken(res.accessToken);
    }
    return res;
  },
  signup: async (data: any) => {
    const res = await apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.accessToken) {
      setAuthToken(res.accessToken);
    }
    return res;
  },
};
