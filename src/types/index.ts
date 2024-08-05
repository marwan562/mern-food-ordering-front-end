export interface IUser {
  _id: string;
  auth0Id: string;
  name: string;
  email: string;
  addressLine1: string;
  country: string;
  city: string;
}

export interface IRestaurant {
  user: string;
  restaurantName: string;
  city: string;
  deliveryPrice: number;
  country: string;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  _id: string;
  lastUpdate: Date;
  __v: number;
}

export type TResRestaurant = {
  data: IRestaurant[];
  pagination: { totalResults: number; totalPages: number; currentPage: number };
};

export interface MenuItem {
  name: string;
  price: number;
  _id: string;
}

export type TStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

type TDeliveryDetails = {
  email: string;
  name: string;
  addressLine1: string;
  city: string;
};

type TCartItems = {
  _id: string;
  menuItemsId: string;
  name: string;
  quantity: number;
};

export type TOrder = {
_id:string
  restaurant: IRestaurant;
  user: IUser;
  deliveryDetails: TDeliveryDetails;
  cartItems: TCartItems[];
  
  totalAmount: number;
  status: TStatus;
  created_At: Date;
};
