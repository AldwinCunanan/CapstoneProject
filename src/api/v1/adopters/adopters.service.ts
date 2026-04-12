import { Adopter } from "./adopters.interface";
import * as adoptersRepository from "./adopters.repository";

// create a new adopter
export const createAdopter = async (
  adopterData: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    preferredSpecies?: string[];
  }
): Promise<Adopter> => {
  try {
    return await adoptersRepository.createAdopter(adopterData);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create adopter: ${errorMessage}`);
  }
};

// get all adopters
export const getAllAdopters = async (): Promise<Adopter[]> => {
  try {
    return await adoptersRepository.getAllAdopters();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve all adopters: ${errorMessage}`);
  }
};

// get adopter by id
export const getAdopterById = async (id: string): Promise<Adopter> => {
  try {
    const adopter = await adoptersRepository.getAdopterById(id);

    if (!adopter) {
      const error: any = new Error("Adopter not found");
      error.code = "ADOPTER_NOT_FOUND";
      throw error;
    }

    return adopter;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve adopter ${id}: ${errorMessage}`);
  }
};

// update adopter
export const updateAdopter = async (
  id: string,
  adopterData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    preferredSpecies?: string[];
  }
): Promise<Adopter> => {
  try {
    const existingAdopter = await adoptersRepository.getAdopterById(id);

    if (!existingAdopter) {
      const error: any = new Error("Adopter not found");
      error.code = "ADOPTER_NOT_FOUND";
      throw error;
    }

    await adoptersRepository.updateAdopter(id, adopterData);

    const updatedAdopter = await adoptersRepository.getAdopterById(id);

    if (!updatedAdopter) {
      throw new Error("Updated adopter could not be found");
    }

    return updatedAdopter;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update adopter ${id}: ${errorMessage}`);
  }
};

// delete adopter
export const deleteAdopter = async (id: string): Promise<void> => {
  try {
    const existingAdopter = await adoptersRepository.getAdopterById(id);

    if (!existingAdopter) {
      const error: any = new Error("Adopter not found");
      error.code = "ADOPTER_NOT_FOUND";
      throw error;
    }

    await adoptersRepository.deleteAdopter(id);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to delete adopter ${id}: ${errorMessage}`);
  }
};