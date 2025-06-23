import z from 'zod';

import {
  vendorRegistrationEmailSchema,
  vendorRegistrationSchema,
  vendorRegistrationEmailVerificationSchema,
  resendVendorRegistrationEmailSchema,
  vendorLoginSchema,
  vendorForgotPasswordSchema,
  vendorResetPasswordSchema,
  vendorChangePasswordSchema,
} from './auth.schema';

export type TVendorRegistrationEmail = z.infer<typeof vendorRegistrationEmailSchema>;
export type TVendorRegistration = z.infer<typeof vendorRegistrationSchema>;
export type TVendorRegistrationEmailVerification = z.infer<
  typeof vendorRegistrationEmailVerificationSchema
>;
export type TResendVendorRegistrationEmail = z.infer<typeof resendVendorRegistrationEmailSchema>;
export type TVendorLogin = z.infer<typeof vendorLoginSchema>;
export type TVendorForgotPassword = z.infer<typeof vendorForgotPasswordSchema>;
export type TVendorResetPassword = z.infer<typeof vendorResetPasswordSchema>;
export type TVendorChangePassword = z.infer<typeof vendorChangePasswordSchema>;
