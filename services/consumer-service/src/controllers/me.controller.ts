import { getConsumerByAccountId } from '@/data/user.data';
import { ApiResponse, asyncHandler, UnauthorizedError } from '@marketly/http';

export const getMeCtrl = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedError('User not authenticated');
  }

  const user = await getConsumerByAccountId(req.user.id);
  if (!user) {
    throw new UnauthorizedError('Consumer not found');
  }

  res.status(200).json(new ApiResponse(200, { user }, 'Consumer details retrieved successfully'));
});
