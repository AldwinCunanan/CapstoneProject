import Joi from "joi";

export const adopterSchemas = {
  // POST /adopters - Create new adopter
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            address: Joi.string().optional(),
            preferredSpecies: Joi.array().items(Joi.string()).optional(),
            }).options({ allowUnknown: false }),
    },

  // GET /adopters/:id - Get single adopter
    getById: {
        params: Joi.object({
            id: Joi.string().required(),
            }),
    },

  // PUT /adopters/:id - Update adopter
    update: {
        params: Joi.object({
            id: Joi.string().required(),
            }),
            body: Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.string().optional(),
            address: Joi.string().optional(),
            preferredSpecies: Joi.array().items(Joi.string()).optional(),
            })
            .min(1) // must update at least one field
            .options({ allowUnknown: false }),
        },

  // DELETE /adopters/:id - Delete adopter
    delete: {
        params: Joi.object({
            id: Joi.string().required(),
    }),
  },
};