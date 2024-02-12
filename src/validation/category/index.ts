import Joi from 'joi';

export const category = Joi.object({
  name: Joi.string().min(8).max(256).required(),
});
