import Joi from "joi";

const genderOptions = ["male", "female"];
const healthOptions = ["healthy", "injured", "sick"];

/**
 * @openapi
 * components:
 *   schemas:
 *     Animal:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - species
 *         - age
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the animal
 *           example: "animal_123abc"
 *         name:
 *           type: string
 *           description: Name of the animal
 *           example: "Buddy"
 *         species:
 *           type: string
 *           description: Species of the animal
 *           example: "Dog"
 *         breed:
 *           type: string
 *           description: Breed of the animal
 *           example: "Golden Retriever"
 *         age:
 *           type: number
 *           minimum: 0
 *           description: Age of the animal
 *           example: 3
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         healthStatus:
 *           type: string
 *           enum: [healthy, injured, sick]
 *           default: healthy
 *         isAdopted:
 *           type: boolean
 *           default: false
 *         description:
 *           type: string
 *           example: "Friendly and energetic"
 */

export const animalSchemas = {
  // POST /animals - Create new animal
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            species: Joi.string().required(),
            breed: Joi.string().optional(),

            age: Joi.number().min(0).required(),
            gender: Joi.string().valid(...genderOptions).required(),

            healthStatus: Joi.string()
                .valid(...healthOptions)
                .default("healthy"),
            isAdopted: Joi.boolean().default(false),
            description: Joi.string().optional(),
    }).options({ allowUnknown: false }),
  },

  // GET /animals/:id - Get single animal
    getById: {
        params: Joi.object({
            id: Joi.string().required(),
    }),
  },

  // PATCH /animals/:id - Update animal
  update: {
        params: Joi.object({
            id: Joi.string().required(),
    }),
        body: Joi.object({
            name: Joi.string().optional(),
            species: Joi.string().optional(),
            breed: Joi.string().optional(),

            age: Joi.number().min(0).optional(),
            gender: Joi.string().valid(...genderOptions).optional(),

            healthStatus: Joi.string()
                .valid(...healthOptions)
                .optional(),

            isAdopted: Joi.boolean().optional(),

            description: Joi.string().optional(),
            })
            .min(1) // must have at least 1 update
            .options({ allowUnknown: false }),
        },

  // DELETE /animals/:id - Delete animal
    delete: {
        params: Joi.object({
            id: Joi.string().required(),
    }),
  },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAnimalRequest:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - age
 *         - gender
 *       properties:
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         breed:
 *           type: string
 *         age:
 *           type: number
 *           minimum: 0
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         healthStatus:
 *           type: string
 *           enum: [healthy, injured, sick]
 *         isAdopted:
 *           type: boolean
 *         description:
 *           type: string
 *
 *     UpdateAnimalRequest:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         breed:
 *           type: string
 *         age:
 *           type: number
 *           minimum: 0
 *         gender:
 *           type: string
 *           enum: [male, female]
 *         healthStatus:
 *           type: string
 *           enum: [healthy, injured, sick]
 *         isAdopted:
 *           type: boolean
 *         description:
 *           type: string
 *
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           example: "Animal not found"
 */