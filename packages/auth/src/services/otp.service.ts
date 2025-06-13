import { BadRequestError, RateLimitError } from '@marketly/http';
import { redisClient } from '@marketly/lib/redis';
import {
  OTP_COOL_DOWN_TIME,
  OTP_EXPIRY_TIME,
  OTP_MAX_ATTEMPTS,
  OTP_NO_OF_ATTEMPTS_RESET_TIME,
  OTP_SPAM_LOCK_TIME,
} from '../constants';

type UserType = 'consumer' | 'vendor';

export async function getStoredOtp(email: string, otpType: UserType | string) {
  const otp = await redisClient.get(`otp::${otpType}:${email}`);
  return otp;
}

export async function checkOtpRestrictions(email: string, otpType: UserType | string) {
  // check otp restrictions - spam check, cool down check, no of attempts
  const isSpamLocked = await redisClient.exists(`otp:spam_lock::${otpType}:${email}`);
  if (isSpamLocked) {
    throw new BadRequestError('Please try again later, too many requests');
  }
  const isCoolDown = await redisClient.exists(`otp:cool_own::${otpType}:${email}`);
  if (isCoolDown) {
    throw new BadRequestError('Wait for 1 minute before trying again');
  }
  const noOfAttempts = await redisClient.get(`otp:attempts::${otpType}:${email}`);
  if (noOfAttempts && parseInt(noOfAttempts) >= OTP_MAX_ATTEMPTS) {
    await redisClient.set(
      `otp:spam_lock::${otpType}:${email}`,
      Date.now(),
      'EX',
      OTP_SPAM_LOCK_TIME,
    );
    throw new RateLimitError(`Wait for ${OTP_SPAM_LOCK_TIME / 60} minutes before trying again`);
  }
}

export async function setOtpRestrictions(email: string, otp: string, otpType: UserType | string) {
  // set otp restrictions - cool down, no of attempts
  await redisClient.set(`otp::${otpType}:${email}`, otp, 'EX', OTP_EXPIRY_TIME);
  await redisClient.set(`otp:cool_own::${otpType}:${email}`, Date.now(), 'EX', OTP_COOL_DOWN_TIME);

  const noOfAttempts = await redisClient.get(`otp:attempts::${otpType}:${email}`);
  if (noOfAttempts) {
    await redisClient.set(
      `otp:attempts::${otpType}:${email}`,
      parseInt(noOfAttempts) + 1,
      'EX',
      OTP_NO_OF_ATTEMPTS_RESET_TIME,
    );
  } else {
    await redisClient.set(
      `otp:attempts::${otpType}:${email}`,
      1,
      'EX',
      OTP_NO_OF_ATTEMPTS_RESET_TIME,
    );
  }
}

export async function deleteOtpRestrictions(email: string, otpType: UserType | string) {
  await redisClient.del(`otp::${otpType}:${email}`);
  await redisClient.del(`otp:cool_own::${otpType}:${email}`);
  await redisClient.del(`otp:spam_lock::${otpType}:${email}`);
  await redisClient.del(`otp:attempts::${otpType}:${email}`);
}
