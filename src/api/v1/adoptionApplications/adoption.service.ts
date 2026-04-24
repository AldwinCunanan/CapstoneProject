import { AdoptionApplication } from "./adoption.interface";
import * as applicationsRepository from "./adoption.repository";
import * as adoptersRepository from "../adopters/adopters.repository";
import * as animalsRepository from "../animals/animals.repository";

// create a new application
export const createApplication = async (
  applicationData: {
    adopterId: string;
    animalId: string;
    message?: string;
  }
): Promise<AdoptionApplication> => {
  try {
    const adopter = await adoptersRepository.getAdopterById(
      applicationData.adopterId
    );

    if (!adopter) {
      const error: any = new Error("Adopter not found");
      error.code = "ADOPTER_NOT_FOUND";
      throw error;
    }

    const animal = await animalsRepository.getAnimalById(
      applicationData.animalId
    );

    if (!animal) {
      const error: any = new Error("ANIMAL_NOT_FOUND");
      error.code = "ANIMAL_NOT_FOUND";
      throw error;
    }

    const newApplication = {
      ...applicationData,
      status: "pending" as const,
    };

    return await applicationsRepository.createApplication(newApplication);
  } catch (error) {
    throw error;
  }
};

// get all applications
export const getAllApplications = async (): Promise<AdoptionApplication[]> => {
  try {
    return await applicationsRepository.getAllApplications();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    throw new Error(`Failed to retrieve all applications: ${errorMessage}`);
  }
};

// get application by id
export const getApplicationById = async (
  id: string
): Promise<AdoptionApplication> => {
  const application = await applicationsRepository.getApplicationById(id);

  if (!application) {
    const error: any = new Error("Application not found");
    error.code = "APPLICATION_NOT_FOUND";
    throw error;
  }

  return application;
};

// update application
export const updateApplication = async (
	id: string,
  applicationData: {
    adopterId?: string;
    animalId?: string;
    status?: "pending" | "approved" | "rejected";
    message?: string;
  }
): Promise<AdoptionApplication> => {
  const existingApplication = await applicationsRepository.getApplicationById(id);

  if (!existingApplication) {
    const error: any = new Error("Application not found");
    error.code = "APPLICATION_NOT_FOUND";
    throw error;
  }

  if (applicationData.adopterId) {
    const adopter = await adoptersRepository.getAdopterById(
      applicationData.adopterId
    );

    if (!adopter) {
      const error: any = new Error("Adopter not found");
      error.code = "ADOPTER_NOT_FOUND";
      throw error;
    }
  }

  if (applicationData.animalId) {
    const animal = await animalsRepository.getAnimalById(
      applicationData.animalId
    );

    if (!animal) {
      const error: any = new Error("Animal not found");
      error.code = "ANIMAL_NOT_FOUND";
      throw error;
    }
  }

  await applicationsRepository.updateApplication(id, applicationData);

  const updatedApplication = await applicationsRepository.getApplicationById(id);

  if (!updatedApplication) {
    throw new Error("Updated application could not be found");
  }

  return updatedApplication;
};

// delete application
export const deleteApplication = async (id: string): Promise<void> => {
  const existingApplication = await applicationsRepository.getApplicationById(id);

  if (!existingApplication) {
    const error: any = new Error("Application not found");
    error.code = "APPLICATION_NOT_FOUND";
    throw error;
  }

  await applicationsRepository.deleteApplication(id);
};