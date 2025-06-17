import {
  TVendorRegistration,
  TUserType,
  TConsumerRegistrationEmailVerification,
  TVendorRegistrationEmailVerification,
} from '@marketly/lib/schemas/auth';
import { prismaClient } from '@marketly/db';
import { BadRequestError, ConflictError } from '@marketly/http';
import { checkOtpRestrictions, getStoredOtp, setOtpRestrictions } from '../utils/otp.utils';
import { generateOtp } from '@marketly/lib/otp';
import { sendEmail } from '@marketly/lib/email';
import { hashPassword } from '../utils/password.utils';

/**
 * ---------------------------- For Registration Check -------------------------------------
 */
const checkExistAccount = async (email: string) => {
  const existAccount = await prismaClient.account.findUnique({ where: { email } });
  if (existAccount) {
    throw new ConflictError('Email already used');
  }
};

async function checkExistStoreName(storeName: string) {
  const existStoreName = await prismaClient.vendor.findFirst({ where: { store_name: storeName } });
  if (existStoreName) {
    throw new BadRequestError('Store name already exist');
  }
}

export async function checkRestrictionsForRegistration(
  userType: TUserType,
  email: string,
  storeName?: string,
) {
  await checkExistAccount(email);

  if (userType === 'vendor') {
    if (!storeName) throw new BadRequestError('Store name is required');
    await checkExistStoreName(storeName);
  }

  await checkOtpRestrictions(userType, email);
}

export async function sendVerificationOtp(userType: TUserType, email: string) {
  const otp = generateOtp(6);
  await sendEmail(
    email,
    'Verify your email',
    { otp },
    { path: 'public/email-templates', name: 'verify-email' },
  );
  await setOtpRestrictions(email, otp, userType);
}

/**
 * ---------------------------------- For Registration --------------------------------------
 */

async function checkUserOtp(userType: TUserType, email: string, otp: string) {
  const storedOtp = await getStoredOtp(email, userType);
  if (!storedOtp || storedOtp !== otp) {
    throw new BadRequestError('Invalid otp code provided');
  }
}

export const createNewAccount = async <T extends TUserType>(
  userType: T,
  data: T extends 'consumer'
    ? TConsumerRegistrationEmailVerification
    : T extends 'vendor'
      ? TVendorRegistrationEmailVerification
      : never,
) => {
  await checkExistAccount(data.email);
  await checkUserOtp(userType, data.email, data.otp);

  try {
    const account = await prismaClient.account.create({
      data: {
        email: data.email,
        role: userType === 'vendor' ? 'Vendor' : 'Consumer',
      },
    });

    const hashedPassword = await prismaClient.userPassword.create({
      data: {
        user_id: account.id,
        hash: await hashPassword(data.password),
      },
    });

    if (!hashedPassword) {
      throw new BadRequestError('Account creation failed');
    }

    if (userType === 'consumer') {
      const consumer = await prismaClient.consumer.create({
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          account_id: account.id,
        },
      });

      return consumer;
    }

    if (userType === 'vendor') {
      const vendorData = data as TVendorRegistration;

      const vendor = await prismaClient.vendor.create({
        data: {
          email: vendorData.email,
          store_name: vendorData.storeName,
          created_by_id: account.id,
          phone_numbers: [vendorData.phoneNumber ?? '1234567890'],
          staffs: {
            create: {
              first_name: vendorData.firstName,
              last_name: vendorData.lastName,
              email: vendorData.email,
              account_id: account.id,
              password: hashedPassword.hash,
              permission: 'Admin',
              phone_number: vendorData.phoneNumber ?? '1234567890',
            },
          },
        },
      });

      return vendor;
    }
  } catch {
    throw new BadRequestError('Failed to create account. Please try again');
  }
  // This line ensures the function always returns or throws
  throw new BadRequestError('Invalid user type');
};

//
export async function sendPasswordResetOtp(userType: TUserType, email: string) {
  const otp = generateOtp(6);

  await sendEmail(
    email,
    'Reset your password',
    { otp },
    {
      path: '../../public/email-templates',
      name: 'reset-password',
    },
  );
  await setOtpRestrictions(email, otp, 'consumer');
}

export async function checkResetPasswordOtp(
  userType: TUserType,
  email: string,
  otp: string | number,
) {
  const storedOtp = await getStoredOtp(email, userType);
  if (!storedOtp || storedOtp !== otp) throw new BadRequestError('Invalid otp code provided');
}
