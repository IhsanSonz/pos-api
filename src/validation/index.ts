import * as auth from './auth.validator';
import * as product from './product.validator';
import * as category from './category.validator';
import { joiObjectIdSchema } from '../util/joi';

const validateId = joiObjectIdSchema;

export { validateId as validate_id, auth, product, category };
