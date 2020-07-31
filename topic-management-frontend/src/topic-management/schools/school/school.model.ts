export interface School {
  id: string;
  name: string;
  address: SchoolAddress;
}

export interface SchoolAddress {
  country: string;
  city: string;
  zipCode: string;
  street: string;
  buildingNumber: string;
}
