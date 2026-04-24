import * as animalsService from "../src/api/v1/animals/animals.service";
import * as animalsRepository from "../src/api/v1/animals/animals.repository";
import { Animal } from "../src/api/v1/animals/animals.interface";

jest.mock("../src/api/v1/animals/animals.repository");

const mockedRepository = animalsRepository as jest.Mocked<typeof animalsRepository>;


describe("animals.service", () => {
  const mockAnimal: Animal = {
    id: "1",
    name: "Buddy",
    species: "Dog",
    breed: "Labrador",
    age: 3,
    gender: "male",
    healthStatus: "Healthy",
    isAdopted: false,
    description: "Friendly dog",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an animal", async () => {
    // Arrange
    const animalData = {
      name: "Buddy",
      species: "Dog",
      breed: "Labrador",
      age: 3,
      gender: "male" as const,
      healthStatus: "Healthy",
      isAdopted: false,
      description: "Friendly dog",
    };

    mockedRepository.createAnimal.mockResolvedValue(mockAnimal);

    // Act
    const result = await animalsService.createAnimal(animalData);

    // Assert
    expect(mockedRepository.createAnimal).toHaveBeenCalledWith(animalData);
    expect(result).toEqual(mockAnimal);
  });

  it("should get all animals", async () => {
    // Arrange
    mockedRepository.getAllAnimals.mockResolvedValue([mockAnimal]);

    // Act
    const result = await animalsService.getAllAnimals();

    // Assert
    expect(mockedRepository.getAllAnimals).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockAnimal]);
  });

  it("should get animal by id", async () => {
    // Arrange
    mockedRepository.getAnimalById.mockResolvedValue(mockAnimal);

    // Act
    const result = await animalsService.getAnimalById("1");

    // Assert
    expect(mockedRepository.getAnimalById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockAnimal);
  });

  it("should update an animal", async () => {
    // Arrange
    const updatedAnimal = { ...mockAnimal, age: 4 };

    mockedRepository.getAnimalById
      .mockResolvedValueOnce(mockAnimal)
      .mockResolvedValueOnce(updatedAnimal);

    mockedRepository.updateAnimal.mockResolvedValue(undefined);

    // Act
    const result = await animalsService.updateAnimal("1", { age: 4 });

    // Assert
    expect(mockedRepository.getAnimalById).toHaveBeenNthCalledWith(1, "1");
    expect(mockedRepository.updateAnimal).toHaveBeenCalledWith("1", { age: 4 });
    expect(mockedRepository.getAnimalById).toHaveBeenNthCalledWith(2, "1");
    expect(result).toEqual(updatedAnimal);
  });

  it("should delete an animal", async () => {
    // Arrange
    mockedRepository.getAnimalById.mockResolvedValue(mockAnimal);
    mockedRepository.deleteAnimal.mockResolvedValue(undefined);

    // Act
    await animalsService.deleteAnimal("1");

    // Assert
    expect(mockedRepository.getAnimalById).toHaveBeenCalledWith("1");
    expect(mockedRepository.deleteAnimal).toHaveBeenCalledWith("1");
  });
});