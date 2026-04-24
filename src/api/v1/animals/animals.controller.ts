import { Request, Response, NextFunction } from "express";
import * as animalsService from "./animals.service";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as notificationsService from "../notifications/notifications.service";

// Create Animal handler
export const createAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const animal = await animalsService.createAnimal(req.body);

    await notificationsService.notifyMatchingAdopters(animal); // new component addition

    res.status(HTTP_STATUS.CREATED).json({
      message: "Animal created successfully",
      data: animal,
    });
  } catch (error) {
    next(error);
  }
};


// get all animals
export const getAllAnimals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const animals = await animalsService.getAllAnimals();

    res.status(HTTP_STATUS.OK).json({
      message: "Animals retrieved successfully",
      count: animals.length,
      data: animals,
    });
  } catch (error) {
    next(error);
  }
};

// get animal by id
export const getAnimalById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const animal = await animalsService.getAnimalById(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Animal retrieved successfully",
      data: animal,
    });
  } catch (error: any) {
    if (error.code === "ANIMAL_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// update animal
export const updateAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const updatedAnimal = await animalsService.updateAnimal(
      id,
      req.body
    );

    res.status(HTTP_STATUS.OK).json({
      message: "Animal updated successfully",
      data: updatedAnimal,
    });
  } catch (error: any) {
    if (error.code === "ANIMAL_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};

// delete animal
export const deleteAnimal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    await animalsService.deleteAnimal(id);

    res.status(HTTP_STATUS.OK).json({
      message: "Animal deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "ANIMAL_NOT_FOUND") {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: error.message,
      });
      return;
    }

    next(error);
  }
};