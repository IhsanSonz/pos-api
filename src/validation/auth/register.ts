import Joi from 'joi';

const register = Joi.object({
  name: Joi.string().min(8).max(256).required(),
  username: Joi.string()
    .min(8)
    .max(30)
    .regex(/^[0-9a-zA-Z_.]+$/)
    .required(),
  password: Joi.string().min(8).max(64).alphanum().required(),
});

export { register };
