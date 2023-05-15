import * as bcrypt from 'bcryptjs';

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hashPassword: string) {
  return bcrypt.compareSync(rawPassword, hashPassword);
}
