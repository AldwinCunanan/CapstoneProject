import express from "express";
import { validateRequest } from "../middleware/validate";
import * as animalController from "../animals/animals.controller"
import { animalSchemas } from "./animals.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const animalRouter = express.Router();

animalRouter.post("/animals", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(animalSchemas.create), animalController.createAnimal)

animalRouter.get("/animals", authenticate, animalController.getAllAnimals);
animalRouter.get("/animals/:id", authenticate, validateRequest(animalSchemas.getById), animalController.getAnimalById);

animalRouter.put("/animals/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(animalSchemas.update), animalController.updateAnimal);

animalRouter.delete("/animals/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(animalSchemas.delete), animalController.deleteAnimal);

export default animalRouter;