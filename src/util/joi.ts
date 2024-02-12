import Joi from 'joi';

export const joiObjectId = Joi.string()
  .required()
  .regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': '{{#label}} need to be a valid mongoose ObjectId format',
  });

export const joiObjectIdSchema = Joi.object({
  id: joiObjectId,
});
