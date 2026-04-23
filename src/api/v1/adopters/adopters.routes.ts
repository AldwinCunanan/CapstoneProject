import express from "express";
import { validateRequest } from "../middleware/validate";
import * as adopterController from "../adopters/adopters.controller"
import { adopterSchemas } from "./adopters.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const adopterRouter = express.Router();

/**
 * @openapi
 * /adopters:
 *   post:
 *     summary: Create a new adopter
 *     tags: [Adopters]
 *     security:
 *       - bearerAuth: []
 *     description: Only admin and staff users can create adopters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdopterRequest'
 *     responses:
 *       '201':
 *         description: Adopter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adopter created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Adopter'
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '403':
 *         description: Not authorized
 */
adopterRouter.post("/adopters", authenticate,   // users 
    validateRequest(adopterSchemas.create), adopterController.createAdopter)

/**
 * @openapi
 * /adopters:
 *   get:
 *     summary: Retrieve all adopters
 *     tags: [Adopters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Adopters retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adopters retrieved successfully"
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Adopter'
 */
adopterRouter.get("/adopters", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    adopterController.getAllAdopters); // admin  

/**
 * @openapi
 * /adopters/{id}:
 *   get:
 *     summary: Retrieve an adopter by ID
 *     tags: [Adopters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Adopter ID
 *     responses:
 *       '200':
 *         description: Adopter retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adopter retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Adopter'
 *       '404':
 *         description: Adopter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adopterRouter.get("/adopters/:id", authenticate,isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
     validateRequest(adopterSchemas.getById), adopterController.getAdopterById);

 /**
 * @openapi
 * /adopters/{id}:
 *   put:
 *     summary: Update an adopter
 *     tags: [Adopters]
 *     security:
 *       - bearerAuth: []
 *     description: Only admins can update adopters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Adopter ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAdopterRequest'
 *     responses:
 *       '200':
 *         description: Adopter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adopter updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Adopter'
 *       '404':
 *         description: Adopter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adopterRouter.put("/adopters/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "staff", "user"], allowSameUser: true }), // user controlled
    validateRequest(adopterSchemas.update), adopterController.updateAdopter);

/**
 * @openapi
 * /adopters/{id}:
 *   delete:
 *     summary: Delete an adopter
 *     tags: [Adopters]
 *     security:
 *       - bearerAuth: []
 *     description: Only admins can delete adopters
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Adopter ID
 *     responses:
 *       '200':
 *         description: Adopter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adopter deleted successfully"
 *       '404':
 *         description: Adopter not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
adopterRouter.delete("/adopters/:id", // deletion account 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(adopterSchemas.delete), adopterController.deleteAdopter);

export default adopterRouter;