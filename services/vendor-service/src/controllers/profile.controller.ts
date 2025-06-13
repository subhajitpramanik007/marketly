import { asyncHandler } from '@marketly/http';

export const getVendorProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Profile' });
});

export const updateVendorProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Profile updated' });
});

export const updateVendorLogo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Logo updated' });
});

export const updateVendorCover = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Cover updated' });
});

export const deleteVendorAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Account deleted' });
});
