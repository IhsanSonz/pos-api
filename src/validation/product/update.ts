import Joi from 'joi';
import { joiObjectIdSchema } from 'util/joi';

const updateId = joiObjectIdSchema;

const update = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
});

export { updateId as update_id, update };
