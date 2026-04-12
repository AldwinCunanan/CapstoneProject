import Joi from "joi";

const genderOptions = ["male", "female"];
const healthOptions = ["healthy", "injured", "sick"];


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