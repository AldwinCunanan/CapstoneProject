import Joi from "joi";

const statusOptions = ["pending", "approved", "rejected"]; // widthrawn

/**
 * @openapi
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - id
 *         - adopterId
 *         - animalId
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the application
 *           example: "application_123abc"
 *         adopterId:
 *           type: string
 *           description: ID of the adopter submitting the application
 *         animalId:
 *           type: string
 *           description: ID of the animal being applied for
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           default: pending
 *         message:
 *           type: string
 *           description: Optional message from the adopter
 *           example: "I have a large yard and experience with pets"
 */
export const applicationSchemas = {
  // POST /applications - Create new application
    create: {
        body: Joi.object({
            adopterId: Joi.string().required(),
            animalId: Joi.string().required(),
            status: Joi.string().valid(...statusOptions).default("pending"),
            message: Joi.string().required(),
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
            adopterId: Joi.string().optional(), // Update 
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
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateApplicationRequest:
 *       type: object
 *       required:
 *         - adopterId
 *         - animalId
 *       properties:
 *         adopterId:
 *           type: string
 *         animalId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           default: pending
 *         message:
 *           type: string
 *
 *     UpdateApplicationRequest:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         adopterId:
 *           type: string
 *         animalId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         message:
 *           type: string
 *
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 */