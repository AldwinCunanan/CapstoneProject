export interface AdoptionApplication {
  id?: string;
  adopterId: string; 
  animalId: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: string;
  updatedAt: string;
}