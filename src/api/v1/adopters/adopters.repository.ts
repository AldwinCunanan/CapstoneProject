import { db } from "../../../config/firebaseConfig";
import { Adopter } from "./adopters.interface";

const COLLECTION_NAME = "adopters";

// Create a new adopter
export const createAdopter = async (
  data: Omit<Adopter, "id" | "createdAt" | "updatedAt">
): Promise<Adopter> => {
  try {
    const newAdopter = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection(COLLECTION_NAME).add(newAdopter);
    const snapshot = await docRef.get();

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Adopter, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create adopter: ${errorMessage}`);
  }
};

// Get all adopters
export const getAllAdopters = async (): Promise<Adopter[]> => {
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

      return {
        id: doc.id,
        ...(data as Omit<Adopter, "id">),
      };
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve adopters: ${errorMessage}`);
  }
};

// Get adopter by ID
export const getAdopterById = async (
  id: string
): Promise<Adopter | null> => {
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

    return {
      id: snapshot.id,
      ...(data as Omit<Adopter, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve adopter: ${errorMessage}`);
  }
};

// Update adopter
export const updateAdopter = async (
  id: string,
  data: Partial<Omit<Adopter, "id" | "createdAt" | "updatedAt">>
): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update adopter: ${errorMessage}`);
  }
};

// Delete adopter
export const deleteAdopter = async (id: string): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to delete adopter: ${errorMessage}`);
  }
};