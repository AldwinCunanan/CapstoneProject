import * as adoptionService from "../src/api/v1/adoptionApplications/adoption.service";
import * as applicationsRepository from "../src/api/v1/adoptionApplications/adoption.repository";
import * as adoptersRepository from "../src/api/v1/adopters/adopters.repository";
import * as animalsRepository from "../src/api/v1/animals/animals.repository";
import { AdoptionApplication } from "../src/api/v1/adoptionApplications/adoption.interface";

jest.mock("../src/api/v1/adoptionApplications/adoption.repository");
jest.mock("../src/api/v1/adopters/adopters.repository");
jest.mock("../src/api/v1/animals/animals.repository");

const mockedApplicationsRepository =
  applicationsRepository as jest.Mocked<typeof applicationsRepository>;
const mockedAdoptersRepository =
  adoptersRepository as jest.Mocked<typeof adoptersRepository>;
const mockedAnimalsRepository =
  animalsRepository as jest.Mocked<typeof animalsRepository>;

describe("adoption.service", () => {
  const mockApplication: AdoptionApplication = {
    id: "1",
    adopterId: "adopter-1",
    animalId: "animal-1",
    status: "pending",
    message: "I would love to adopt this pet.",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  const mockAdopter = {
    id: "adopter-1",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "1234567890",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  const mockAnimal = {
    id: "animal-1",
    name: "Buddy",
    species: "Dog",
    age: 3,
    gender: "male" as const,
    healthStatus: "Healthy",
    isAdopted: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an application", async () => {
    // Arrange
    const applicationData = {
      adopterId: "adopter-1",
      animalId: "animal-1",
      message: "I would love to adopt this pet.",
    };

    mockedAdoptersRepository.getAdopterById.mockResolvedValue(mockAdopter);
    mockedAnimalsRepository.getAnimalById.mockResolvedValue(mockAnimal);
    mockedApplicationsRepository.createApplication.mockResolvedValue(mockApplication);

    // Act
    const result = await adoptionService.createApplication(applicationData);

    // Assert
    expect(mockedAdoptersRepository.getAdopterById).toHaveBeenCalledWith("adopter-1");
    expect(mockedAnimalsRepository.getAnimalById).toHaveBeenCalledWith("animal-1");
    expect(mockedApplicationsRepository.createApplication).toHaveBeenCalledWith({
      ...applicationData,
      status: "pending",
    });
    expect(result).toEqual(mockApplication);
  });

  it("should get all applications", async () => {
    // Arrange
    mockedApplicationsRepository.getAllApplications.mockResolvedValue([mockApplication]);

    // Act
    const result = await adoptionService.getAllApplications();

    // Assert
    expect(mockedApplicationsRepository.getAllApplications).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockApplication]);
  });

  it("should get application by id", async () => {
    // Arrange
    mockedApplicationsRepository.getApplicationById.mockResolvedValue(mockApplication);

    // Act
    const result = await adoptionService.getApplicationById("1");

    // Assert
    expect(mockedApplicationsRepository.getApplicationById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockApplication);
  });

  it("should update an application", async () => {
    // Arrange
    const updatedApplication: AdoptionApplication = {
      ...mockApplication,
      status: "approved",
    };

    mockedApplicationsRepository.getApplicationById
      .mockResolvedValueOnce(mockApplication)
      .mockResolvedValueOnce(updatedApplication);

    mockedApplicationsRepository.updateApplication.mockResolvedValue(undefined);

    // Act
    const result = await adoptionService.updateApplication("1", {
      status: "approved",
    });

    // Assert
    expect(mockedApplicationsRepository.getApplicationById).toHaveBeenNthCalledWith(1, "1");
    expect(mockedApplicationsRepository.updateApplication).toHaveBeenCalledWith("1", {
      status: "approved",
    });
    expect(mockedApplicationsRepository.getApplicationById).toHaveBeenNthCalledWith(2, "1");
    expect(result).toEqual(updatedApplication);
  });

  it("should delete an application", async () => {
    // Arrange
    mockedApplicationsRepository.getApplicationById.mockResolvedValue(mockApplication);
    mockedApplicationsRepository.deleteApplication.mockResolvedValue(undefined);

    // Act
    await adoptionService.deleteApplication("1");

    // Assert
    expect(mockedApplicationsRepository.getApplicationById).toHaveBeenCalledWith("1");
    expect(mockedApplicationsRepository.deleteApplication).toHaveBeenCalledWith("1");
  });
});