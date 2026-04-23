import express from "express";
import { validateRequest } from "../middleware/validate";
import * as animalController from "../animals/animals.controller"
import { animalSchemas } from "./animals.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const animalRouter = express.Router();

/**
 * @openapi
 * /animals:
 *   post:
 *     summary: Create a new animal
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new animal record. Accessible to admin and staff users only.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - age
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *                 minimum: 0
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               healthStatus:
 *                 type: string
 *                 enum: [healthy, injured, sick]
 *                 default: healthy
 *               isAdopted:
 *                 type: boolean
 *                 default: false
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Animal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalResponse'
 *       '400':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Not authorized
 */
animalRouter.post("/animals", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(animalSchemas.create), animalController.createAnimal)

    /**
 * @openapi
 * /animals:
 *   get:
 *     summary: Retrieve all animals
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Animals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalsListResponse'
 */
animalRouter.get("/animals", authenticate, animalController.getAllAnimals);

/**
 * @openapi
 * /animals/{id}:
 *   get:
 *     summary: Retrieve an animal by ID
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique animal ID
 *     responses:
 *       '200':
 *         description: Animal retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalResponse'
 *       '404':
 *         description: Animal not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
animalRouter.get("/animals/:id", authenticate, validateRequest(animalSchemas.getById), animalController.getAnimalById);

/**
 * @openapi
 * /animals/{id}:
 *   put:
 *     summary: Update an animal by ID
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     description: Updates an existing animal. Accessible to admin users only.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique animal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               breed:
 *                 type: string
 *               age:
 *                 type: number
 *                 minimum: 0
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               healthStatus:
 *                 type: string
 *                 enum: [healthy, injured, sick]
 *               isAdopted:
 *                 type: boolean
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Animal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnimalResponse'
 *       '404':
 *         description: Animal not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
animalRouter.put("/animals/:id", authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(animalSchemas.update), animalController.updateAnimal);

/**
 * @openapi
 * /animals/{id}:
 *   delete:
 *     summary: Delete an animal by ID
 *     tags: [Animals]
 *     security:
 *       - bearerAuth: []
 *     description: Deletes an animal record. Accessible to admin users only.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique animal ID
 *     responses:
 *       '200':
 *         description: Animal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       '404':
 *         description: Animal not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
animalRouter.delete("/animals/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(animalSchemas.delete), animalController.deleteAnimal);

export default animalRouter;