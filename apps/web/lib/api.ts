const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', body }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body }),
  patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

// ── Auth ──────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ role: string; userId: string }>('/api/auth/login', { email, password }),
  register: (data: { name: string; email: string; phone: string; password: string; businessName?: string }) =>
    api.post<{ role: string }>('/api/auth/register', data),
  logout: () => api.post<void>('/api/auth/logout', {}),
  me: () => api.get<{ id: string; email: string; role: string; customer?: unknown; staff?: unknown }>('/api/auth/me'),
};

// ── Brands ───────────────────────────────────────────────
export const brandsApi = {
  getPublic: () => api.get<Brand[]>('/api/brands'),
  getAll: () => api.get<Brand[]>('/api/brands/all'),
  create: (data: Partial<Brand>) => api.post<Brand>('/api/brands', data),
  update: (id: string, data: Partial<Brand>) => api.patch<Brand>(`/api/brands/${id}`, data),
  delete: (id: string) => api.delete<void>(`/api/brands/${id}`),
};

// ── Content ──────────────────────────────────────────────
export const contentApi = {
  get: (key: string) => api.get<WebsiteContent>(`/api/content/${key}`),
  getAll: () => api.get<WebsiteContent[]>('/api/content'),
  update: (key: string, data: Partial<WebsiteContent>) => api.put<WebsiteContent>(`/api/content/${key}`, data),
};

// ── Orders ───────────────────────────────────────────────
export const ordersApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Order>>(`/api/orders?${new URLSearchParams(params)}`),
  getMy: () => api.get<Order[]>('/api/orders/my'),
  getById: (id: string) => api.get<Order>(`/api/orders/${id}`),
  create: (data: unknown) => api.post<Order>('/api/orders', data),
  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch<Order>(`/api/orders/${id}/status`, { status, notes }),
};

// ── Products ─────────────────────────────────────────────
export const productsApi = {
  getAll: () => api.get<Product[]>('/api/products'),
  create: (data: unknown) => api.post<Product>('/api/products', data),
  update: (id: string, data: unknown) => api.patch<Product>(`/api/products/${id}`, data),
};

// ── Analytics ────────────────────────────────────────────
export const analyticsApi = {
  getDashboard: () => api.get<DashboardData>('/api/analytics/dashboard'),
  getOrdersByType: () => api.get<OrderTypeData[]>('/api/analytics/orders-by-type'),
};

// ── Customers ────────────────────────────────────────────
export const customersApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Customer>>(`/api/customers?${new URLSearchParams(params)}`),
  getMe: () => api.get<Customer>('/api/customers/me'),
  getById: (id: string) => api.get<Customer>(`/api/customers/${id}`),
  update: (id: string, data: unknown) => api.patch<Customer>(`/api/customers/${id}`, data),
};

// ── Deliveries ───────────────────────────────────────────
export const deliveriesApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Delivery>>(`/api/deliveries?${new URLSearchParams(params)}`),
  getMy: () => api.get<Delivery[]>('/api/deliveries/my'),
  create: (data: unknown) => api.post<Delivery>('/api/deliveries', data),
  updateStatus: (id: string, status: string, failureReason?: string) =>
    api.patch<Delivery>(`/api/deliveries/${id}/status`, { status, failureReason }),
  addProof: (id: string, data: unknown) => api.post<unknown>(`/api/deliveries/${id}/proof`, data),
};

// ── Loads ────────────────────────────────────────────────
export const loadsApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<GasLoad>>(`/api/loads?${new URLSearchParams(params)}`),
  create: (data: unknown) => api.post<GasLoad>('/api/loads', data),
  recordArrival: (id: string, data: unknown) => api.patch<GasLoad>(`/api/loads/${id}/arrive`, data),
  approve: (id: string) => api.post<void>(`/api/loads/${id}/approve`, {}),
  reject: (id: string, reason: string) => api.post<void>(`/api/loads/${id}/reject`, { reason }),
};

// ── Payments ─────────────────────────────────────────────
export const paymentsApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Payment>>(`/api/payments?${new URLSearchParams(params)}`),
  create: (data: unknown) => api.post<Payment>('/api/payments', data),
};

// ── Quotations ───────────────────────────────────────────
export const quotationsApi = {
  getAll: (params?: Record<string, string>) =>
    api.get<PaginatedResponse<Quotation>>(`/api/quotations?${new URLSearchParams(params)}`),
  getMy: () => api.get<Quotation[]>('/api/quotations/my'),
  create: (data: unknown) => api.post<Quotation>('/api/quotations', data),
  accept: (id: string) => api.patch<Quotation>(`/api/quotations/${id}/accept`, {}),
  reject: (id: string) => api.patch<Quotation>(`/api/quotations/${id}/reject`, {}),
};

export interface SupplyRequest {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirementType: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export const supplyRequestsApi = {
  create: (data: { name: string; phone: string; email: string; category: string; message: string; website?: string }) =>
    api.post<{ received: boolean; id?: string }>('/api/supply-requests', data),
  getAll: (status?: string) =>
    api.get<SupplyRequest[]>(`/api/supply-requests${status ? `?status=${encodeURIComponent(status)}` : ''}`),
  updateStatus: (id: string, status: SupplyRequest['status']) =>
    api.patch<SupplyRequest>(`/api/supply-requests/${id}/status`, { status }),
};

// ── Staff ────────────────────────────────────────────────
export const staffApi = {
  getAll: () => api.get<Staff[]>('/api/staff'),
  getDrivers: () => api.get<Staff[]>('/api/staff/drivers'),
};

// ── Inventory ────────────────────────────────────────────
export const inventoryApi = {
  getAll: () => api.get<InventoryRecord[]>('/api/inventory'),
  getMovements: (params?: Record<string, string>) =>
    api.get<StockMovement[]>(`/api/inventory/movements?${new URLSearchParams(params)}`),
  adjust: (data: unknown) => api.post<void>('/api/inventory/adjust', data),
};

// ── Types ────────────────────────────────────────────────
export interface Brand {
  id: string;
  nameEnglish: string;
  nameTamil?: string;
  logoUrl?: string;
  category?: string;
  displayOrder: number;
  isApproved: boolean;
  isVisible: boolean;
  notes?: string;
  createdAt: string;
}

export interface WebsiteContent {
  id: string;
  key: string;
  title?: string;
  content?: string;
  contentJson?: unknown;
  imageUrl?: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  orderCode: string;
  customerId: string;
  customer?: Customer;
  status: string;
  orderType: string;
  notes?: string;
  deliveryNotes?: string;
  totalAmount: string;
  netAmount: string;
  taxAmount: string;
  items?: OrderItem[];
  delivery?: Delivery;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: string;
  unitPrice: string;
  taxRate: string;
  lineTotal: string;
}

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  customerType: string;
  isActive: boolean;
  registeredAt: string;
  creditAccount?: CreditAccount;
  addresses?: CustomerAddress[];
}

export interface CustomerAddress {
  id: string;
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district?: string;
  state: string;
  pincode?: string;
  isDefault: boolean;
}

export interface CreditAccount {
  id: string;
  creditLimit: string;
  outstandingBalance: string;
}

export interface Product {
  id: string;
  name: string;
  nameTamil?: string;
  description?: string;
  unit: string;
  isActive: boolean;
  displayOrder: number;
  imageUrl?: string;
}

export interface Delivery {
  id: string;
  deliveryCode: string;
  orderId: string;
  order?: Order;
  status: string;
  scheduledDate?: string;
  scheduledTimeSlot?: string;
  vehicleNumber?: string;
  driverId?: string;
  driver?: Staff;
  address?: CustomerAddress;
  proof?: DeliveryProof;
}

export interface DeliveryProof {
  id: string;
  photoUrl?: string;
  receiverName?: string;
  notes?: string;
  recordedAt: string;
}

export interface GasLoad {
  id: string;
  loadCode: string;
  status: string;
  supplierId: string;
  supplier?: { name: string };
  dispatchDate?: string;
  expectedArrival?: string;
  actualArrival?: string;
  vehicleNumber?: string;
  invoiceReference?: string;
  items?: GasLoadItem[];
  createdAt: string;
}

export interface GasLoadItem {
  id: string;
  productId: string;
  product?: Product;
  expectedQty: string;
  receivedQty: string;
  damagedQty: string;
  missingQty: string;
  excessQty: string;
}

export interface Payment {
  id: string;
  paymentCode: string;
  customerId: string;
  amount: string;
  method: string;
  status: string;
  paidAt?: string;
  reference?: string;
  createdAt: string;
}

export interface Quotation {
  id: string;
  quotationCode: string;
  customerId: string;
  customer?: Customer;
  status: string;
  totalAmount: string;
  netAmount: string;
  validUntil?: string;
  items?: QuotationItem[];
  createdAt: string;
}

export interface QuotationItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: string;
  unitPrice: string;
  lineTotal: string;
}

export interface Staff {
  id: string;
  employeeCode: string;
  name: string;
  phone: string;
  role: string;
  isActive: boolean;
}

export interface InventoryRecord {
  id: string;
  productId: string;
  product: Product;
  availableQty: string;
  reservedQty: string;
  damagedQty: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  product?: Product;
  movementType: string;
  quantity: string;
  balanceAfter: string;
  referenceType?: string;
  notes?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardData {
  summary: {
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
    totalCustomers: number;
  };
  inventory: InventoryRecord[];
  recentOrders: Order[];
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}

export interface OrderTypeData {
  orderType: string;
  _count: { id: number };
}

