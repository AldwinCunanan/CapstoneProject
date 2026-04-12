import { Request, Response, NextFunction } from "express";
import * as applicationsService from "./adoption.service";
import { HTTP_STATUS } from "../constants/httpConstants";

// create a new application
export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const application = await applicationsService.createApplication(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Application created successfully",
      data: application,
    });
  } catch (error: any) {
    if (error.code === "ADOPTER_NOT_FOUND" || error.code === "ANIMAL_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// get all applications
export const getAllApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const applications = await applicationsService.getAllApplications();

    res.status(HTTP_STATUS.OK).json({
      message: "Applications retrieved successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// get application by id
export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const application = await applicationsService.getApplicationById(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Application retrieved successfully",
      data: application,
    });
  } catch (error: any) {
    if (error.code === "APPLICATION_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// update application
export const updateApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const updatedApplication = await applicationsService.updateApplication(
      id,
      req.body
    );

    res.status(HTTP_STATUS.OK).json({
      message: "Application updated successfully",
      data: updatedApplication,
    });
  } catch (error: any) {
    if (
      error.code === "APPLICATION_NOT_FOUND" ||
      error.code === "ADOPTER_NOT_FOUND" ||
      error.code === "ANIMAL_NOT_FOUND"
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// delete application
export const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await applicationsService.deleteApplication(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Application deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "APPLICATION_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};