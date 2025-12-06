export interface Cycle {
  id: string;
  name: string;
  type: "city" | "mtb" | "road";
  gear: boolean;
  pricePerHour: number;
  locationName: string;
  lat: number;
  lng: number;
  isAvailableNow: boolean;
  nextAvailableTime?: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  cycleId: string;
  userId: string;
  startTime: string;
  endTime: string;
  pricePaid: number;
  distanceKm: number;
}
