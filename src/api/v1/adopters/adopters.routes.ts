import express from "express";
import { validateRequest } from "../middleware/validate";
import * as adopterController from "../adopters/adopters.controller"
import { adopterSchemas } from "./adopters.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const adopterRouter = express.Router();

adopterRouter.post("/adopters", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(adopterSchemas.create), adopterController.createAdopter)

adopterRouter.get("/adopters", authenticate, adopterController.getAllAdopters);

adopterRouter.get("/adopters/:id", authenticate, validateRequest(adopterSchemas.getById),
 adopterController.getAdopterById);

adopterRouter.put("/adopters/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(adopterSchemas.update), adopterController.updateAdopter);

adopterRouter.delete("/adopters/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(adopterSchemas.delete), adopterController.deleteAdopter);

export default adopterRouter;