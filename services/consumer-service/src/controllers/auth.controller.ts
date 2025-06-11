import { asyncHandler } from '@marketly/http';

/**
 * Register a new user
 * - validate user input-{firstName, lastName?, email, password}
 * - If user exists, throw error
 * - Check otp restrictions
 * - Send verification email with otp
 */
const userRegistration = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'User registration otp sent successfully',
  });
});

/**
 * Verify user registration otp
 * - validate user input-{firstName, lastName?, email, password, otp}
 * - Verify otp
 * - Create user
 * - Send new registration alert
 */
const verifyUserRegistrationOtp = asyncHandler(async (req, res) => {
  res.status(201).json({
    status: 'ok',
    message: 'User registered successfully',
  });
});

/**
 * Resend otp
 * - validate user input-{email}
 * - If user exists, throw error
 * - Check otp restrictions
 * - Send verification email with otp
 */
const resendUserRegistrationOtp = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Otp resent successfully',
  });
});

/**
 * Login a user
 * - validate user input-{email, password}
 * - If user exists, throw error
 * - Check password match
 * - Create session
 * - Send new login alert
 * - Return user details
 * */
const userLogin = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'User logged in successfully',
  });
});

/**
 * Logout a user
 * - check if user is logged in
 * - Delete session
 * - User logged out
 * */
const userLogout = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'User logged out successfully',
  });
});

/**
 * Forgot password
 * - validate user input-{email}
 * - If user not exists, throw error
 * - Check reset password restrictions
 * - Send reset password email
 **/
const forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Password reset email sent successfully',
  });
});

/**
 * Reset password
 * - validate user input-{email, password, otp}
 * - If user not exists, throw error
 * - Check reset password restrictions
 * - Send reset password email
 **/
const resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Password reset successfully',
  });
});

export {
  userRegistration,
  verifyUserRegistrationOtp,
  resendUserRegistrationOtp,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
};
