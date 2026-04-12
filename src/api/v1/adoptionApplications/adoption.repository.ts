import { db } from "../../../config/firebaseConfig";
import { AdoptionApplication } from "./adoption.interface";

const COLLECTION_NAME = "applications";

// Create a new application
export const createApplication = async (
  data: Omit<AdoptionApplication,"id" | "createdAt" | "updatedAt">
): Promise<AdoptionApplication> => {
  try {
    const newApplication = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection(COLLECTION_NAME).add(newApplication);
    const snapshot = await docRef.get();

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<AdoptionApplication, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create application: ${errorMessage}`);
  }
};
  
// Get all applications
export const getAllApplications = async (): Promise<AdoptionApplication[]> => {
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
        ...(data as Omit<AdoptionApplication, "id">),
      };
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve applications: ${errorMessage}`);
  }
};

// Get application by ID
export const getApplicationById = async (
  id: string
): Promise<AdoptionApplication | null> => {
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
      ...(data as Omit<AdoptionApplication, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve application: ${errorMessage}`);
  }
};

// Update application
export const updateApplication = async (
  id: string,
  data: Partial<
    Omit<AdoptionApplication, "id" | "createdAt" | "updatedAt">
  >
): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update application: ${errorMessage}`);
  }
};

// Delete application
export const deleteApplication = async (
  id: string
): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to delete application: ${errorMessage}`);
  }
};