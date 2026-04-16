import * as adoptersService from "../src/api/v1/adopters/adopters.service";
import * as adoptersRepository from "../src/api/v1/adopters/adopters.repository";
import { Adopter } from "../src/api/v1/adopters/adopters.interface";

jest.mock("../src/api/v1/adopters/adopters.repository");

const mockedRepository = adoptersRepository as jest.Mocked<typeof adoptersRepository>;

describe("adopters.service", () => {
  const mockAdopter: Adopter = {
    id: "1",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "1234567890",
    address: "123 Main St",
    preferredSpecies: ["Dog"],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an adopter", async () => {
    // Arrange
    const adopterData = {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "1234567890",
      address: "123 Main St",
      preferredSpecies: ["Dog"],
    };

    mockedRepository.createAdopter.mockResolvedValue(mockAdopter);

    // Act
    const result = await adoptersService.createAdopter(adopterData);

    // Assert
    expect(mockedRepository.createAdopter).toHaveBeenCalledWith(adopterData);
    expect(result).toEqual(mockAdopter);
  });

  it("should get all adopters", async () => {
    // Arrange
    mockedRepository.getAllAdopters.mockResolvedValue([mockAdopter]);

    // Act
    const result = await adoptersService.getAllAdopters();

    // Assert
    expect(mockedRepository.getAllAdopters).toHaveBeenCalledTimes(1);
    expect(result).toEqual([mockAdopter]);
  });

  it("should get adopter by id", async () => {
    // Arrange
    mockedRepository.getAdopterById.mockResolvedValue(mockAdopter);

    // Act
    const result = await adoptersService.getAdopterById("1");

    // Assert
    expect(mockedRepository.getAdopterById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockAdopter);
  });

  it("should update an adopter", async () => {
    // Arrange
    const updatedAdopter = { ...mockAdopter, name: "Updated Name" };

    mockedRepository.getAdopterById
      .mockResolvedValueOnce(mockAdopter)
      .mockResolvedValueOnce(updatedAdopter);

    mockedRepository.updateAdopter.mockResolvedValue(undefined);

    // Act
    const result = await adoptersService.updateAdopter("1", {
      name: "Updated Name",
    });

    // Assert
    expect(mockedRepository.getAdopterById).toHaveBeenNthCalledWith(1, "1");
    expect(mockedRepository.updateAdopter).toHaveBeenCalledWith("1", {
      name: "Updated Name",
    });
    expect(mockedRepository.getAdopterById).toHaveBeenNthCalledWith(2, "1");
    expect(result).toEqual(updatedAdopter);
  });

  it("should delete an adopter", async () => {
    // Arrange
    mockedRepository.getAdopterById.mockResolvedValue(mockAdopter);
    mockedRepository.deleteAdopter.mockResolvedValue(undefined);

    // Act
    await adoptersService.deleteAdopter("1");

    // Assert
    expect(mockedRepository.getAdopterById).toHaveBeenCalledWith("1");
    expect(mockedRepository.deleteAdopter).toHaveBeenCalledWith("1");
  });
});