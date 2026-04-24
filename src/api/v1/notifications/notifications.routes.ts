import express from "express";
import { validateRequest } from "../middleware/validate";
import * as notificationController from "./notifications.controller";
import { notificationSchemas } from "./notifications.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const notificationRouter = express.Router();

/**
 * @openapi
 * /notifications/adopter/{adopterId}:
 *   get:
 *     summary: Retrieve notifications for an adopter
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: adopterId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Adopter ID
 *     responses:
 *       '200':
 *         description: Notifications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notifications retrieved successfully"
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Notification'
 */
notificationRouter.get(
  "/notifications/adopter/:adopterId",
  authenticate, isAuthorized({hasRole:["user","admin", "user"]}),
  validateRequest(notificationSchemas.getByAdopterId),
  notificationController.getNotificationsByAdopterId
);

/**
 * @openapi
 * /notifications/{id}/read:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       '200':
 *         description: Notification marked as read successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification marked as read successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
 *       '404':
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
notificationRouter.put(
  "/notifications/:id/read",
  authenticate,
  validateRequest(notificationSchemas.markAsRead),
  notificationController.markNotificationAsRead
);

export default notificationRouter;