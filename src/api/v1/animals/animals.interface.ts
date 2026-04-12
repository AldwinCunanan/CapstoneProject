export interface Animal {
  id?: string; 
  name: string;
  species: string; 
  breed?: string;
  age: number; 
  gender: "male" | "female";
  healthStatus: string; 
  isAdopted: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}