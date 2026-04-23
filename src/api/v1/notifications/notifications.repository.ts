import { db } from "../../../config/firebaseConfig";
import { Notification } from "./notifications.interface";

const COLLECTION_NAME = "notifications";

// Create a new notification
export const createNotification = async (
  data: Omit<Notification, "id" | "createdAt" | "updatedAt">
): Promise<Notification> => {
  try {
    const newNotification = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await db.collection(COLLECTION_NAME).add(newNotification);
    const snapshot = await docRef.get();

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Notification, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to create notification: ${errorMessage}`);
  }
};

// Get notifications by adopterId
export const getNotificationsByAdopterId = async (
  adopterId: string
): Promise<Notification[]> => {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .where("adopterId", "==", adopterId)
      .get();

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
        ...(data as Omit<Notification, "id">),
      };
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve notifications: ${errorMessage}`);
  }
};

// Get notification by id
export const getNotificationById = async (
  id: string
): Promise<Notification | null> => {
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
      ...(data as Omit<Notification, "id">),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve notification: ${errorMessage}`);
  }
};

// Mark notification as read
export const updateNotification = async (
  id: string,
  data: Partial<Omit<Notification, "id" | "createdAt" | "updatedAt">>
): Promise<void> => {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to update notification: ${errorMessage}`);
  }
};