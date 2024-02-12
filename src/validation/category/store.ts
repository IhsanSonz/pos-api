import Joi from 'joi';

const store = Joi.object({
  name: Joi.string().required(),
});

export { store };
