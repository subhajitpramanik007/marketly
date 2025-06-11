import { Router } from 'express';
import {
  userRegistration,
  verifyUserRegistrationOtp,
  resendUserRegistrationOtp,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';

import { zodValidationMiddleware } from '@marketly/http';
import {
  registerSchema,
  verifyUserRegistrationOtpSchema,
  forgotPasswordSchema,
  loginSchema,
  resendUserRegistrationOtpSchema,
  resetPasswordSchema,
} from '../schemas';

const router = Router();

router.route('/register').post(
  zodValidationMiddleware(registerSchema),
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'User registration'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: 'User registration details',
      required: true,
      schema: {
        firstName: 'Rahul',
        lastName: 'Pramanik',
        email: 'rahul@example.com',
        password: 'SecurePassword123'
      }
    }
   * #swagger.responses[200] = { description: 'User verification otp sent successfully' }
   */
  userRegistration,
);

router.route('/verify-email').post(
  zodValidationMiddleware(verifyUserRegistrationOtpSchema),
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Verify user registration otp'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: 'User registration details',
      required: true,
      schema: {
        firstName: 'Rahul',
        lastName: 'Pramanik',
        email: 'rahul@example.com',
        password: 'SecurePassword123',
        otp: '123456'
      }
    }
   * #swagger.responses[201] = { description: 'User created successfully' }
   */
  verifyUserRegistrationOtp,
);

router.route('/resend-verification-email').post(
  zodValidationMiddleware(resendUserRegistrationOtpSchema),
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Resend user registration otp'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: 'User registration details',
      required: true,
      schema: {
        firstName: 'Rahul',
        lastName: 'Pramanik',
        email: 'rahul@example.com',
        password: 'SecurePassword123'
      }
    }
   * #swagger.responses[200] = { description: 'User registration otp sent successfully'}
   * */
  resendUserRegistrationOtp,
);

router.route('/login').post(
  zodValidationMiddleware(loginSchema),
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'User login'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: 'User login details',
      required: true,
      schema: {
        email: 'rahul@example.com',
        password: 'SecurePassword123'
      }
    }
   * #swagger.responses[200] = { description: 'User logged in successfully' }
   * */
  userLogin,
);

router.route('/logout').post(
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'User logout'
   * #swagger.responses[200] = { description: 'User logged out successfully' }
   * */
  userLogout,
);

router.route('/forgot-password').post(
  zodValidationMiddleware(forgotPasswordSchema),
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Forgot password'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: 'Forgot password details',
      required: true,
      schema: {
        email: 'rahul@example.com'
      }
   }
   * #swagger.responses[200] = { description: 'Password reset otp sent successfully' }
   * */
  forgotPassword,
);

router.route('/reset-password').post(
  zodValidationMiddleware(resetPasswordSchema),
  /**
   * #swagger.tags = ['Auth']
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
  resetPassword,
);

export { router as authRoutes };
