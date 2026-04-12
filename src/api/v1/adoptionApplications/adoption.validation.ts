import Joi from "joi";

const statusOptions = ["pending", "approved", "rejected"];

export const applicationSchemas = {
  // POST /applications - Create new application
    create: {
        body: Joi.object({
            adopterId: Joi.string().required(),
            animalId: Joi.string().required(),
            status: Joi.string().valid(...statusOptions).default("pending"),
            message: Joi.string().optional(),
            }).options({ allowUnknown: false }),
        },

    // GET /applications/:id - Get single application
    getById: {
            params: Joi.object({
            id: Joi.string().required(),
            }),
        },

  // PATCH /applications/:id - Update application
    update: {
        params: Joi.object({
            id: Joi.string().required(),
            }),
            body: Joi.object({
            adopterId: Joi.string().optional(),
            animalId: Joi.string().optional(),
            status: Joi.string().valid(...statusOptions).optional(),
            message: Joi.string().optional(),
            })
            .min(1)
            .options({ allowUnknown: false }),
    },

  // DELETE /applications/:id - Delete application
    delete: {
        params: Joi.object({
            id: Joi.string().required(),
            }),
    },
};