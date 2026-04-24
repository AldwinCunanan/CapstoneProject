import { Notification } from "./notifications.interface";
import * as notificationsRepository from "./notifications.repository";
import * as adoptersRepository from "../adopters/adopters.repository";
import { Animal } from "../animals/animals.interface";

// Create notifications for adopters whose preferred species matches the new animal
export const notifyMatchingAdopters = async (
  animal: Animal
): Promise<Notification[]> => {
  try {
    const animalId = animal.id;

    if (!animalId) {
      throw new Error("Animal id is required to create notifications");
    }

    const adopters = await adoptersRepository.getAllAdopters();

    const matchingAdopters = adopters.filter((adopter) =>
      adopter.preferredSpecies?.includes(animal.species)
    );

    const createdNotifications: Notification[] = [];

    for (const adopter of matchingAdopters) {
      const adopterId = adopter.id;

      if (!adopterId) {
        continue;
      }

      const notification = await notificationsRepository.createNotification({
        adopterId,
        animalId,
        message: `A new ${animal.species} named ${animal.name} is available for adoption.`,
        isRead: false,
      });

      createdNotifications.push(notification);
    }

    return createdNotifications;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to notify matching adopters: ${errorMessage}`);
  }
};

// Get notifications for one adopter
export const getNotificationsByAdopterId = async (
  adopterId: string
): Promise<Notification[]> => {
  try {
    return await notificationsRepository.getNotificationsByAdopterId(adopterId);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve notifications: ${errorMessage}`);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  try {
    const existingNotification =
      await notificationsRepository.getNotificationById(id);

    if (!existingNotification) {
      const error: any = new Error("Notification not found");
      error.code = "NOTIFICATION_NOT_FOUND";
      throw error;
    }

    await notificationsRepository.updateNotification(id, { isRead: true });

    const updatedNotification =
      await notificationsRepository.getNotificationById(id);

    if (!updatedNotification) {
      throw new Error("Updated notification could not be found");
    }

    return updatedNotification;
  } catch (error: unknown) {
    if (error instanceof Error && (error as any).code === "NOTIFICATION_NOT_FOUND") {
      throw error;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to mark notification as read: ${errorMessage}`);
  }
};