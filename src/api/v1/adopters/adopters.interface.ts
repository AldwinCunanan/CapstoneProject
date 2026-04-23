export interface Adopter {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  preferredSpecies?: string[]; // for subscription feature
  createdAt: string;
  updatedAt: string;
}