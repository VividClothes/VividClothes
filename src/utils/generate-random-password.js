import crypto from 'crypto';

export function generateRandomPassword() {
  return crypto.randomBytes(20).toString('hex');
}
