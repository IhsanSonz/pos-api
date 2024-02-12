import Joi from 'joi';

const login = Joi.object({
  username: Joi.string()
    .min(8)
    .max(30)
    .regex(/^[0-9a-zA-Z_.]+$/)
    .required(),
  password: Joi.string().min(8).max(64).alphanum().required(),
});

export { login };
