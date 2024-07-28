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
  country:string
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  _id: string;
  lastUpdate: Date;
  __v: number;
}

export interface MenuItem {
  name: string;
  price: number;
  _id: string;
}
