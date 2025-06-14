'use server';

import { cookies } from 'next/headers';

export const setUserType = async (userType: 'consumer' | 'sellers' | 'admin') => {
  try {
    const cookie = await cookies();
    cookie.set('useAs', userType, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 365),
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
