import { Request, Response, NextFunction } from "express";
import * as adoptersService from "./adopters.service";
import { HTTP_STATUS } from "../constants/httpConstants";
// create a new adopter
export const createAdopter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const adopter = await adoptersService.createAdopter(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Adopter created successfully",
      data: adopter,
    });
  } catch (error) {
    next(error);
  }
};

// get all adopters
export const getAllAdopters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const adopters = await adoptersService.getAllAdopters();

    res.status(HTTP_STATUS.OK).json({
      message: "Adopters retrieved successfully",
      count: adopters.length,
      data: adopters,
    });
  } catch (error) {
    next(error);
  }
};

// get adopter by id
export const getAdopterById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const adopter = await adoptersService.getAdopterById(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Adopter retrieved successfully",
      data: adopter,
    });
  } catch (error: any) {
    if (error.code === "ADOPTER_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// update adopter
export const updateAdopter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const adopter = await adoptersService.updateAdopter(id, req.body);

    res.status(HTTP_STATUS.OK).json({
      message: "Adopter updated successfully",
      data: adopter,
    });
  } catch (error: any) {
    if (error.code === "ADOPTER_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// delete adopter
export const deleteAdopter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    await adoptersService.deleteAdopter(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Adopter deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "ADOPTER_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};