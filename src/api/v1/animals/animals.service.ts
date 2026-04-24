import { Animal } from "./animals.interface";
import * as animalsRepository from "./animals.repository";

const COLLECTION = "animals";

// create a new animal
export const createAnimal = async (
  animalData: {
    name: string;
    species: string;
    breed?: string;
    age: number;
    gender: "male" | "female";
    healthStatus: string;
    isAdopted: boolean;
    description?: string;
  }
): Promise<Animal> => {
  try {
    return await animalsRepository.createAnimal(animalData);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create animal: ${errorMessage}`);
  }
};

// get all animals
export const getAllAnimals = async (): Promise<Animal[]> => {
  try {
    return await animalsRepository.getAllAnimals();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve all animals: ${errorMessage}`);
  }
};

// get animal by id
export const getAnimalById = async (id: string): Promise<Animal> => {
  try {
    const animal = await animalsRepository.getAnimalById(id);

    if (!animal) {
      const error: any = new Error("Animal not found");
      error.code = "ANIMAL_NOT_FOUND";
      throw error;
    }

    return animal;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve animal ${id}: ${errorMessage}`);
  }
};

// update animal
export const updateAnimal = async (
  id: string,
  animalData: {
    name?: string;
    species?: string;
    breed?: string;
    age?: number;
    gender?: "male" | "female";
    healthStatus?: string;
    isAdopted?: boolean;
    description?: string;
  }
): Promise<Animal> => {
  try {
    const existingAnimal = await animalsRepository.getAnimalById(id);

    if (!existingAnimal) {
      const error: any = new Error("Animal not found");
      error.code = "ANIMAL_NOT_FOUND";
      throw error;
    }

    await animalsRepository.updateAnimal(id, animalData);

    const updatedAnimal = await animalsRepository.getAnimalById(id);

    if (!updatedAnimal) {
      throw new Error("Updated animal could not be found");
    }

    return updatedAnimal;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update animal ${id}: ${errorMessage}`);
  }
};

// delete animal
export const deleteAnimal = async (id: string): Promise<void> => {
  try {
    const existingAnimal = await animalsRepository.getAnimalById(id);

    if (!existingAnimal) {
      const error: any = new Error("Animal not found");
      error.code = "ANIMAL_NOT_FOUND";
      throw error;
    }

    await animalsRepository.deleteAnimal(id);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to delete animal ${id}: ${errorMessage}`);
  }
};