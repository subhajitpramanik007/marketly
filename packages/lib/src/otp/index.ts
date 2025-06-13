import crypto from 'crypto';

export const generateOtp = (length: number) => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length - 1).toString();
};
