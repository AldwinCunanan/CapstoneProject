import express from "express";
import { validateRequest } from "../middleware/validate";
import * as applicationController from "./adoption.controller"
import { applicationSchemas } from "./adoption.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const adoptionRequest = express.Router();

/**
 * @openapi
 * /applications:
 *   post:
 *     summary: Create a new adoption application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new adoption application for an animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApplicationRequest'
 *     responses:
 *       '201':
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Application'
 *       '404':
 *         description: Adopter or Animal not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adoptionRequest.post("/applications", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(applicationSchemas.create), applicationController.createApplication)

/**
 * @openapi
 * /applications:
 *   get:
 *     summary: Retrieve all applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Applications retrieved successfully"
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 */
adoptionRequest.get("/applications", authenticate, applicationController.getAllApplications);

/**
 * @openapi
 * /applications/{id}:
 *   get:
 *     summary: Retrieve an application by ID
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       '200':
 *         description: Application retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Application'
 *       '404':
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adoptionRequest.get("/applications/:id", authenticate, validateRequest(applicationSchemas.getById),
 applicationController.getApplicationById);

/**
 * @openapi
 * /applications/{id}:
 *   put:
 *     summary: Update an application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     description: Updates an existing adoption application
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateApplicationRequest'
 *     responses:
 *       '200':
 *         description: Application updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Application'
 *       '404':
 *         description: Application, Adopter, or Animal not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adoptionRequest.put("/applications/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(applicationSchemas.update), applicationController.updateApplication);

/**
 * @openapi
 * /applications/{id}:
 *   delete:
 *     summary: Delete an application
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     description: Deletes an adoption application
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     responses:
 *       '200':
 *         description: Application deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Application deleted successfully"
 *       '404':
 *         description: Application not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adoptionRequest.delete("/applications/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(applicationSchemas.delete), applicationController.deleteApplication);

export default adoptionRequest;