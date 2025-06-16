import { Router } from 'express';
import {
  registrationController,
  verifyRegistrationController,
  resendRegistrationEmailController,
  loginController,
  logoutController,
  refreshSessionController,
  forgotPasswordController,
  resetPasswordController,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.route('/register').post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Register a consumer or vendor'
     * #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: {
           userType: 'consumer',
           firstName: 'Rahul',
           lastName: 'Pramanik',
           email: 'rahul@example.com',
           password: 'SecurePassword123',
           storeName: 'Store name (only for vendors)'
         }
       }
     * #swagger.responses[200] = { description: 'OTP sent' }
     */
  registrationController,
);

router.route('/verify-registration').post(
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
  verifyRegistrationController,
);

router.route('/resend-registration-email').post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Resend user registration email'
     * #swagger.parameters['body'] = {
         in: 'body',
         description: 'User registration details',
         required: true,
         schema: {
           firstName: 'Rahul',
           lastName: 'Pramanik',
           email: 'rahul@example.com',
         }
       }
     * #swagger.responses[200] = { description: 'OTP sent' }
     */
  resendRegistrationEmailController,
);

router.route('/login').post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Login user'
     * #swagger.parameters['body'] = {
         in: 'body',
         description: 'User login details',
         required: true,
         schema: {
           email: 'rahul@example.com',
           password: 'SecurePassword123',
         }
       }
     * #swagger.responses[200] = { description: 'User logged in successfully' }
     */
  loginController,
);

router.route('/logout').post(
  authMiddleware,
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Logout user'
   * #swagger.responses[200] = { description: 'User logged out successfully' }
   */
  logoutController,
);

router.route('/refresh-session').post(
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Refresh user session'
   * #swagger.responses[200] = { description: 'Session refreshed successfully' }
   */
  refreshSessionController,
);

router.route('/forgot-password').post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Forgot password'
     * #swagger.parameters['body'] = {
         in: 'body',
         description: 'User forgot password details',
         required: true,
         schema: {
           email: 'rahul@example.com',
         }
       }
     * #swagger.responses[200] = { description: 'OTP sent' }
     */
  forgotPasswordController,
);

router.route('/reset-password').post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Reset password'
     * #swagger.parameters['body'] = {
         in: 'body',
         description: 'User reset password details',
         required: true,
         schema: {
           email: 'rahul@example.com',
           otp: '123456',
           password: 'SecurePassword123',
         }
       }
     * #swagger.responses[200] = { description: 'Password reset successfully' }
     */
  resetPasswordController,
);

export { router as authRoutes };
