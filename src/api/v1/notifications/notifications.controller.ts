import { Request, Response, NextFunction } from "express";
import * as notificationsService from "./notifications.service";
import { HTTP_STATUS } from "../constants/httpConstants";

// Get notifications for an adopter
export const getNotificationsByAdopterId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const adopterId = req.params.adopterId as string;
    const notifications =
      await notificationsService.getNotificationsByAdopterId(adopterId);

    res.status(HTTP_STATUS.OK).json({
      message: "Notifications retrieved successfully",
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const notification = await notificationsService.markNotificationAsRead(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Notification marked as read successfully",
      data: notification,
    });
  } catch (error: any) {
    if (error.code === "NOTIFICATION_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};