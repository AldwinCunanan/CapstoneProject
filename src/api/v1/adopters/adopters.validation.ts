import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Adopter:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the adopter
 *           example: "adopter_123abc"
 *         name:
 *           type: string
 *           description: Full name of the adopter
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the adopter
 *           example: "jane@example.com"
 *         phone:
 *           type: string
 *           description: Contact number of the adopter
 *           example: "+1-204-555-1234"
 *         address:
 *           type: string
 *           description: Home address of the adopter
 *           example: "123 Main St, Winnipeg, MB"
 *         preferredSpecies:
 *           type: array
 *           description: Preferred animal species for adoption
 *           items:
 *             type: string
 *           example: ["Dog", "Cat"]
 */

export const adopterSchemas = {
  // POST /adopters - Create new adopter
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().optional(),
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
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAdopterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the adopter
 *           example: "Jane Smith"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the adopter
 *           example: "jane@example.com"
 *         phone:
 *           type: string
 *           description: Contact number of the adopter
 *           example: "+1-204-555-1234"
 *         address:
 *           type: string
 *           description: Home address of the adopter
 *           example: "123 Main St, Winnipeg, MB"
 *         preferredSpecies:
 *           type: array
 *           description: Preferred animal species for adoption
 *           items:
 *             type: string
 *           example: ["Dog", "Cat"]
 *
 *     UpdateAdopterRequest:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         preferredSpecies:
 *           type: array
 *           items:
 *             type: string
 *
 *     Error:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 */