import { getRepository } from 'typeorm';
import { inspect } from 'util';
import { v4 as uuidV4 } from 'uuid';
import { User } from '../entities/User';

export async function createUser(name: string, id = uuidV4()): Promise<User> {
  const result = await getRepository(User).save({ id, name });
  console.log(`User created ${inspect(result)}`);
  return result;
}

export async function getAllUsers(): Promise<User[]> {
  return getRepository(User).find();
}

export async function getUser(id:string): Promise<User | undefined> {
  return getRepository(User).findOne(id);
}
