import * as z from 'zod';
import {
  consumerRegistrationEmailVerificationSchema,
  consumerRegistrationSchema,
  EUserTypeEnum,
  userForgotPasswordSchema,
  userLoginSchema,
  userResetPasswordSchema,
  vendorRegistrationEmailVerificationSchema,
  vendorRegistrationSchema,
} from './auth.schema';

export type TUserType = z.infer<typeof EUserTypeEnum>;

export type TConsumerRegistration = z.infer<typeof consumerRegistrationSchema>;
export type TConsumerRegistrationEmailVerification = z.infer<
  typeof consumerRegistrationEmailVerificationSchema
>;

export type TVendorRegistration = z.infer<typeof vendorRegistrationSchema>;
export type TVendorRegistrationEmailVerification = z.infer<
  typeof vendorRegistrationEmailVerificationSchema
>;

export type TUserLogin = z.infer<typeof userLoginSchema>;

export type TUserForgotPassword = z.infer<typeof userForgotPasswordSchema>;
export type TUserResetPassword = z.infer<typeof userResetPasswordSchema>;
