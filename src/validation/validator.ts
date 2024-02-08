import * as validator from 'validator';
import mongoose from 'mongoose';

// Define isEmpty function
const isMyEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

// Define isEmpty function
const isValidRef = (value: string) => {
  try {
    const valid = mongoose.Types.ObjectId.isValid(value);
    return valid;
  } catch (error: any) {
    return false;
  }
};

// Export validator with isMyEmpty
export default { ...validator, isMyEmpty, isEmpty: isMyEmpty, isValidRef };
