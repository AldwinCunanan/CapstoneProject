import express from "express";
import { validateRequest } from "../middleware/validate";
import * as adopterController from "../adopters/adopters.controller"
import { adopterSchemas } from "./adopters.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const animalRouter = express.Router();

animalRouter.post("/adopters", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(adopterSchemas.create), adopterController.createAdopter)

animalRouter.get("/adopters", authenticate, adopterController.getAllAdopters);

animalRouter.get("/adopters/:id", authenticate, validateRequest(adopterSchemas.getById),
 adopterController.getAdopterById);

animalRouter.put("/adopters/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(adopterSchemas.update), adopterController.updateAdopter);

animalRouter.delete("/adopters/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(adopterSchemas.delete), adopterController.deleteAdopter);

export default animalRouter;