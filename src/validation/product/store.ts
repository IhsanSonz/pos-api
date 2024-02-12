import Joi from 'joi';

const store = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
});

export { store };
