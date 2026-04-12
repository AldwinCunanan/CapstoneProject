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
animalRouter.get("/loans/:id", authenticate, validateRequest(animalSchemas.getById), animalController.getAnimalById);

animalRouter.put("/loans/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(animalSchemas.update), animalController.updateAnimal);

animalRouter.delete("/loans/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(animalSchemas.delete), animalController.deleteAnimal);

export default animalRouter;