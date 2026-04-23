import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - id
 *         - adopterId
 *         - animalId
 *         - message
 *         - isRead
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the notification
 *           example: "notification_123abc"
 *         adopterId:
 *           type: string
 *           description: ID of the adopter receiving the notification
 *         animalId:
 *           type: string
 *           description: ID of the related animal
 *         message:
 *           type: string
 *           description: Notification message shown to the user
 *           example: "A new Dog named Buddy is available for adoption."
 *         isRead:
 *           type: boolean
 *           description: Whether the notification has been read
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export const notificationSchemas = {
  getByAdopterId: {
    params: Joi.object({
      adopterId: Joi.string().required(),
    }),
  },

  markAsRead: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: "Notification not found"
 */