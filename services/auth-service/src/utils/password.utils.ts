import * as argon from 'argon2';

export async function hashPassword(password: string) {
  return await argon.hash(password);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await argon.verify(hashedPassword, password);
}
