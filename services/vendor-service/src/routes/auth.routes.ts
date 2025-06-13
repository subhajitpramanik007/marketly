import { Router } from 'express';

import {
  vendorRegistration,
  verifyVendorRegistration,
  resendVendorRegistration,
  vendorLogin,
  vendorLogout,
  vendorRefreshToken,
  vendorForgotPassword,
  vendorResetPassword,
} from '../controllers/auth.controller.js';

import { authMiddleware } from '@marketly/auth/middleware';
import { vendorAuthMiddleware } from '../middleware/index.js';

import { zodValidationMiddleware } from '@marketly/http';

import {
  vendorRegistrationSchema,
  vendorRegistrationEmailVerificationSchema,
  resendVendorRegistrationEmailSchema,
  vendorLoginSchema,
  vendorForgotPasswordSchema,
  vendorResetPasswordSchema,
} from '@marketly/lib/schemas';

const router = Router();

router.route('/register').post(
  zodValidationMiddleware(vendorRegistrationSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Vendor registration'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor registration details',
        required: true,
        schema: {
          storeName: 'Store Name',
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
          email: 'rahul@example.com',
          password: 'SecurePassword123',
        }
      }
     * #swagger.responses[200] = { description: 'Verify vendor registration otp' }
     */
  vendorRegistration,
);

router.route('/verify-email').post(
  zodValidationMiddleware(vendorRegistrationEmailVerificationSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Verify vendor registration otp'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor registration details',
        required: true,
        schema: {
          storeName: 'Store Name',
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
          email: 'rahul@example.com',
          password: 'SecurePassword123',
          otp: '123456'
        }
      }
     * #swagger.responses[201] = { description: 'Vendor created successfully' }
     */
  verifyVendorRegistration,
);

router.route('/resend-verification-email').post(
  zodValidationMiddleware(resendVendorRegistrationEmailSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Resend vendor registration otp'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor registration details',
        required: true,
        schema: {
          storeName: 'Store Name',
          firstName: 'Owner Name',
          lastName: 'Owner Last Name',
          email: 'rahul@example.com',
          password: 'SecurePassword123',
        }
      }
     * #swagger.responses[201] = { description: 'Vendor created successfully' }
     */
  resendVendorRegistration,
);

router.route('/login').post(
  zodValidationMiddleware(vendorLoginSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Vendor login'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Vendor login details',
        required: true,
        schema: {
          email: 'rahul@example.com',
          password: 'SecurePassword123',
        }
      }
     * #swagger.responses[200] = { description: 'Vendor logged in successfully' }
     */
  vendorLogin,
);

router.route('/logout').post(
  authMiddleware,
  vendorAuthMiddleware,
  /**
   * #swagger.tags = ['Vendors - Auth']
   * #swagger.summary = 'Vendor logout'
   * #swagger.responses[200] = { description: 'Vendor logged out successfully' }
   */
  vendorLogout,
);

router.route('/refresh-token').post(
  /**
   * #swagger.tags = ['Vendors - Auth']
   * #swagger.summary = 'Vendor refresh token'
   * #swagger.responses[200] = { description: 'Vendor refresh token' }
   */
  vendorRefreshToken,
);

router.route('/forgot-password').post(
  authMiddleware,
  vendorAuthMiddleware,
  zodValidationMiddleware(vendorForgotPasswordSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Forgot password'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Forgot password details',
        required: true,
        schema: {
          email: 'rahul@example.com',
        }
      }
     * #swagger.responses[200] = { description: 'Password reset otp sent successfully' }
     */
  vendorForgotPassword,
);

router.route('/reset-password').post(
  authMiddleware,
  vendorAuthMiddleware,
  zodValidationMiddleware(vendorResetPasswordSchema),
  /**
     * #swagger.tags = ['Vendors - Auth']
     * #swagger.summary = 'Reset password'
     * #swagger.parameters['body'] = {
        in: 'body',
        description: 'Reset password details',
        required: true,
        schema: {
          email: 'rahul@example.com',
          otp: '123456',
          password: 'SecurePassword123',
          confirmPassword: 'SecurePassword123'
        }
     }
     * #swagger.responses[200] = { description: 'Password reset successfully' }   
     */
  vendorResetPassword,
);

export { router as authRoutes };
