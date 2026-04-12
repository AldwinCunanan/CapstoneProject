import { db } from "../../../config/firebaseConfig";
import { Animal } from "./animals.interface";

const COLLECTION_NAME = "animals";

// Create a new animal document in Firestore
export const createAnimal = async (
  data: Omit<Animal, "id" | "createdAt" | "updatedAt">
): Promise<Animal> => {
  try {
    const newAnimal = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection(COLLECTION_NAME).add(newAnimal);
    const snapshot = await docRef.get();

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Animal, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create animal: ${errorMessage}`);
  }
};

// Get all animals from Firestore
export const getAllAnimals = async (): Promise<Animal[]> => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as any;

      if (data.createdAt?.toDate) {
        data.createdAt = data.createdAt.toDate().toISOString();
      }

      if (data.updatedAt?.toDate) {
        data.updatedAt = data.updatedAt.toDate().toISOString();
      }

      return data as Animal;
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve animals: ${errorMessage}`);
  }
};

// Retrieve animal by their id 
export const getAnimalById = async (id: string): Promise<Animal | null> => {
  try {
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data() as any;

    if (data.createdAt?.toDate) {
      data.createdAt = data.createdAt.toDate().toISOString();
    }

    if (data.updatedAt?.toDate) {
      data.updatedAt = data.updatedAt.toDate().toISOString();
    }

    return data as Animal;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve animal by id: ${errorMessage}`);
  }
};

// Update and existing Animal document
export const updateAnimal = async (
  id: string,
  data: Partial<Animal>
): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update animal: ${errorMessage}`);
  }
};

// Delete an Animal document
export const deleteAnimal = async (id: string): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to delete animal: ${errorMessage}`);
  }
};