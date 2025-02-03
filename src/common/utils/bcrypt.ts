import bcrypt from 'bcrypt';

export const hashValue = async (value: string, saltRounds: number = 10) => {
  return await bcrypt.hash(value, saltRounds);
};

export const compareValue = async (value: string, hashedValue: string) => {
  return await bcrypt.compare(value, hashedValue);
};
