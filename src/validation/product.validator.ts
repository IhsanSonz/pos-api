import Joi from 'joi';
import { joiObjectId } from '../util/joi';

export const index = Joi.object({
  name: Joi.string().min(3).required(),
  category: joiObjectId,
});
