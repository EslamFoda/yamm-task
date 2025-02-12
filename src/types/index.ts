export interface Order {
  id: string;
  reason: string;
  store_name: string;
  amount: number;
  active: boolean;
  store_url: string;
  store_logo: string;
  decision?: OrderDecision;
  items: OrderItem[];
}

export interface OrderItem {
  name: string;
  id: string;
  price: number;
  quantity: number;
  decision?: OrderDecision;
}

export type OrderDecision = "reject" | "accept" | "escalate";
