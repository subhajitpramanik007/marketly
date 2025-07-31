import { ApiResponse, asyncHandler, BadRequestError, zodValidation } from '@marketly/http';

import { orderIdParamsSchema, orderQuerySchema } from '@/schemas/order.schemas';

import * as orderService from '@/services/order.service';

export const getOrders = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const query = zodValidation(orderQuerySchema, req.query);

  const { page, limit } = query;

  // Get orders
  const orders = await orderService.getOrders(accountId, query);

  // get total number of orders
  const totalOrders = await orderService.countOrders(accountId, query.status);

  res.status(200).json(
    new ApiResponse(200, {
      orders,
      meta: {
        total: parseInt(totalOrders.toString()),
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
      },
    }),
  );
});

export const getOrderById = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const { orderId } = zodValidation(orderIdParamsSchema, req.params);

  const order = await orderService.getOrderById(orderId, accountId);

  if (!order) {
    throw new BadRequestError('Order not found');
  }

  res.status(200).json(new ApiResponse(200, { order }));
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const accountId = req.consumer?.accountId;
  const { orderId } = zodValidation(orderIdParamsSchema, req.params);

  const cancelledOrder = await orderService.cancelOrder(orderId, accountId);

  res
    .status(200)
    .json(new ApiResponse(200, { order: cancelledOrder }, 'Order cancelled successfully'));
});
