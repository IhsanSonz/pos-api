import Joi from 'joi';

export const index = Joi.object({
  name: Joi.string().min(3).required(),
});
