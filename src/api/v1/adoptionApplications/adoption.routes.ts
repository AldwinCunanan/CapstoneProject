import express from "express";
import { validateRequest } from "../middleware/validate";
import * as applicationController from "../adoptionApplications/adoption.controller"
import { applicationSchemas } from "./adoption.validation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const adoptionRequest = express.Router();

adoptionRequest.post("/applications", authenticate, isAuthorized({hasRole:["admin", "staff"]}), 
    validateRequest(applicationSchemas.create), applicationController.createApplication)

adoptionRequest.get("/applications", authenticate, applicationController.getAllApplications);

adoptionRequest.get("/applications/:id", authenticate, validateRequest(applicationSchemas.getById),
 applicationController.getApplicationById);

adoptionRequest.put("/applications/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
    validateRequest(applicationSchemas.update), applicationController.updateApplication);

adoptionRequest.delete("/applications/:id", 
     authenticate,
     isAuthorized({ hasRole: ["admin"] }),
     validateRequest(applicationSchemas.delete), applicationController.deleteApplication);

export default adoptionRequest;